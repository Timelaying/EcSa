"use client"

import { demoPurchase } from "@/app/actions/demoPurchase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import { FormEvent, useState } from "react"

type CheckoutFormProps = {
    product: {
        id: string
        imagePath : string
        name: string
        priceInCents: number
        description: string
    }
}

export function CheckoutForm({product }: CheckoutFormProps){
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [downloadId, setDownloadId] = useState<string>()

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(undefined)
        const result = await demoPurchase(product.id, email)
        if (result.error) setErrorMessage(result.error)
        else setDownloadId(result.downloadId)
        setIsLoading(false)
    }

    return(
    <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className="flex gap-4 items-center">
            <div className="aspect-video flex-shrink-0 w-1/3 relative">
                <Image src={product.imagePath} fill alt={product.name} className="object-cover" />
            </div>
            <div>
                <div className="text-lg">
                    {formatCurrency(product.priceInCents / 100)}
                </div>
                <h1 className="text-2x1 font-bold">{product.name}</h1>
                <div className="line-clamp-3 text-muted-foreground">{product.description}</div>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Demo checkout</CardTitle>
                    <CardDescription>
                        This is a demo store. No payment is taken and nothing is charged.
                    </CardDescription>
                    {errorMessage && (<CardDescription className="text-destructive">{errorMessage}</CardDescription>)}
                </CardHeader>
                <CardContent className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </CardContent>
                <CardFooter>
                    {downloadId ? (
                        <Button className="w-full" size="lg" asChild>
                            <a href={`/products/download/${downloadId}`}>Download {product.name}</a>
                        </Button>
                    ) : (
                        <Button className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Get it (demo, free)"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </form>
    </div>
    )
}
