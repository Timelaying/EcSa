import { Column, Row, Section, Text } from "@react-email/components"

type OrderInformationProps = {
    order: {id: string}
    product: {}
    downloadVerificationId: string
}

const dateFormater = new Intl.DateTimeFormat("en", { dateStyle: "medium"})

export function OrderInformation({ order, product, downloadVerificationId}: OrderInformationProps){
    return (
        <>
        <Section>
            <Row>
                <Column>
                    <Text className="mb-0 text-grey-500 whitespace-nowrap text-nowrap mr-4">
                        Order ID</Text>
                    <Text className="mt-0 mr-4">{order.id}</Text>
                </Column>
                <Column>
                    <Text className="mb-0 text-grey-500 whitespace-nowrap text-nowrap mr-4">
                        Order ID</Text>
                    <Text className="mt-0 mr-4">{order.id}</Text>
                </Column>
                <Column>
                    <Text className="mb-0 text-grey-500 whitespace-nowrap text-nowrap mr-4">
                        Order ID</Text>
                    <Text className="mt-0 mr-4">{order.id}</Text>
                </Column>
            </Row>
        </Section> 
        </>
    )
}