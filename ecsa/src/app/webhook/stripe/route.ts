import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NODE_ENV as string) //this where we had stripe cli issues, replace env stripe secrete key

export async  function POST(req: NextRequest){
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.NODE_ENV as string          // replace env stripe secert key
    )

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productId = charge.metadata.productId
        const email = charge.billing_details.email
        const pricePaidInCents = charge.amount

        const product = await db.product.findUnique({ where: { id: productId }})
        if (product == null || email == null){
            return new NextResponse("Bad Request", {status: 400 })
        }

        const userFields = {
            email,
            orders: { create: { productId, pricePaidInCents }},
        }

        const {orders: [order]db.user.upsert({
            where: {email},
            create: userFields,
            update: userFields,
            select: {orders: {orderBy: {createdAt: "desc"}, take: 1}}
        })}
    }
}