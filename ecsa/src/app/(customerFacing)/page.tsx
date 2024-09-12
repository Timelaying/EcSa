import db from "@/db/db"
import { Product } from "@prisma/client"

function getMostPopularProducts() {
   return  db.product.findMany({
      where: {isAvailableForPurchase: true},
      orderBy: {orders: { _count: "desc"}},
      take: 6
   })
 }

 function getNewestProducts() {
   return  db.product.findMany({
      where: {isAvailableForPurchase: true},
      orderBy: { createdAt: "desc"},
      take: 6
   })
 }
 
 export default function HomePage() { 
    return <main className="space-y-12">
      <ProductGridSection productsFetcher={getMostPopularProducts}/>
      <ProductGridSection productsFetcher={getNewestProducts}/>

    </main>
 }

 type ProductGridSectionProps = {
   title: string
   productsFetcher: () => Promise<Product[]>
 }

 function ProductGridSection({productsFetcher, title,}: ProductGridSectionProps) {
   ;<div className="space-y-4">
      <div className="flex- gap-4">
         <h2 className="text-3xl font-bold">{title}</h2>
      </div>
   </div>
 }