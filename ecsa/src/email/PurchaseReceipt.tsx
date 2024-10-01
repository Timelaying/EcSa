import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
    product: {
        name: string
    }

    order: {id: string; createdAt: Date; pricePaidInCents: number}
}

PurchaseReceiptEmail.PreviewProps = {
    product: {name: "product name"},
    order: {id: crypto.randomUUID(), createdAt: new Date(), pricePaidInCents: 1000, }
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({ product,order, } : PurchaseReceiptEmailProps){
return (
    <Html>
        <Preview>Download {product.name} and view receipt</Preview>
        <Tailwind>
            <Head />
            <Body className="font-sans bg-white">
                <Container className="max-w-xl">
                    <Heading> Purchase Receipt</Heading>
                    <OrderInformation />
                </Container>
            </Body>
        </Tailwind>
    </Html>
)
}