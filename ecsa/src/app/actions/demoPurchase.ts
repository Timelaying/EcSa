"use server"

import db from "@/db/db"
import { z } from "zod"

const emailSchema = z.string().email()

/**
 * Demo checkout: records an order and returns a time-limited download link.
 * No payment is taken and nothing is charged.
 */
export async function demoPurchase(productId: string, rawEmail: string): Promise<{ error?: string; downloadId?: string }> {
    const parsed = emailSchema.safeParse(rawEmail)
    if (!parsed.success) return { error: "Enter a valid email address" }
    const email = parsed.data

    const product = await db.product.findUnique({ where: { id: productId } })
    if (product == null || !product.isAvailableForPurchase) return { error: "This product is not available" }

    await db.user.upsert({
        where: { email },
        create: { email, orders: { create: { productId, pricePaidInCents: 0 } } },
        update: { orders: { create: { productId, pricePaidInCents: 0 } } },
    })

    const verification = await db.downloadVerification.create({
        data: { productId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
    })
    return { downloadId: verification.id }
}
