import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type OrderHistoryEmailProps = {
    product: {
        name: string
        imagePath: string
        description: string
    }

    order: {id: string; createdAt: Date; pricePaidInCents: number}
    downloadVerificationId: string
}

OrderHistoryEmail.PreviewProps = {
    product: {name: "Product name", description: "string", imagePath: ""},
    order: {id: crypto.randomUUID(), createdAt: new Date(), pricePaidInCents: 1000, },
    downloadVerificationId: crypto.randomUUID()
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ product,order, downloadVerificationId,} : OrderHistoryEmailProps){
return (
    <Html>
        <Preview>Download {product.name} and view receipt</Preview>
        <Tailwind>
            <Head />
            <Body className="font-sans bg-white">
                <Container className="max-w-xl">
                    <Heading> Purchase Receipt</Heading>
                    <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId} />
                </Container>
            </Body>
        </Tailwind>
    </Html>
)
}