"use server"

import db from "@/db/db";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email()
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function emailOrderHistory(prevState: unknown, formData: FormData)
: 
Promise<{ message?: string; error?: string}> {
    const result = emailSchema.safeParse(formData.get("email"))

    if (result.success === false){
        return {error: "Invalid email address"}
    }

    const user = await db.user.findUnique({where:{ email: result.data }, select: {
        email: true,
        orders: {
            select: {
                pricePaidInCents: true,
                id: true,
                createdAt: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        imagePath: true,
                        description: true
                    },
                },
            },
        },
    },

    })

    if (user == null){
        return{
            message:
            "Check your email to view your order history"
        }
    }

    const orders = user.orders.map(order => {
        return {
            ...order,
            downloadVerficationId: db.downloadVerification.create({
                data: {
                    expiresAt : new Date(Date.now() + 24 * 1000 * 60 * 60),
                    productId: order.product.id,
                },
            }),
        }
    })

    return {message: ""}
}