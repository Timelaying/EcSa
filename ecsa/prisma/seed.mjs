import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })

const products = [
  { id: "demo-1", name: "Starter Template Pack", priceInCents: 1500, imagePath: "/demo/product-1.svg", description: "A demo product: a bundle of starter templates." },
  { id: "demo-2", name: "Email Marketing Guide", priceInCents: 2500, imagePath: "/demo/product-2.svg", description: "A demo product: a short guide to email campaigns." },
  { id: "demo-3", name: "Icon Set", priceInCents: 900, imagePath: "/demo/product-3.svg", description: "A demo product: a set of simple icons." },
]

for (const p of products) {
  await db.product.upsert({
    where: { id: p.id },
    create: { ...p, filePath: "products/demo.txt", isAvailableForPurchase: true },
    update: {},
  })
}
console.log(`Seeded ${products.length} demo products`)
await db.$disconnect()
