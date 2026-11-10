import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { readStoredFile, extensionOf } from "@/lib/storage"

export async function GET(req: NextRequest, {params:{id}}: {params: {id: string}}) {
    const product = await db.product.findUnique({
        where: {id},
        select: {filePath: true, name: true},
})

if (product == null) return notFound()

const file = await readStoredFile(product.filePath)
if (file == null) return notFound()
const extension = extensionOf(product.filePath)

return new NextResponse(new Uint8Array(file),{
    headers: {
        "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
        "Content-Length": file.length.toString(),
    },
})

}