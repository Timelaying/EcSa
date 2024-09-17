import { ProductCard } from "@/components/ProductCard";
import db from "@/db/db";
import { Suspense } from "react";

function getProducts(){
    return db.product.findMany({
        where: {isAvailableForPurchase: true}
    })
}

export default function ProductPage(){
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Suspense

    >
     <ProductSuspense />   
    </Suspense>
    </div>
}

async function ProductSuspense(){
    const products = await getProducts()
    return products.map(product => <ProductCard key={product.id} {...product} />)
}