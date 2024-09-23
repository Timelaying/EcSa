export default function SuccessPage(){
    return (
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
    </div>
    )
}