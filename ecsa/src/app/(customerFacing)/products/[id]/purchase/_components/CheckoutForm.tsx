import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

type CheckoutFormProps = {
    product: {}
    clientSecret: string
}

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({product, clientSecret }: CheckoutFormProps){
    return <Elements
}