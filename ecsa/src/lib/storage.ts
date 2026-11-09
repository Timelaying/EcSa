import fs from "fs/promises"
import path from "path"
import { put, del } from "@vercel/blob"

// Files are stored in Vercel Blob when BLOB_READ_WRITE_TOKEN is set (Vercel
// deployments) and on local disk otherwise (local development, Docker).
const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const isUrl = (ref: string) => /^https?:\/\//.test(ref)

export type StoredKind = "file" | "image"

// Returns a reference to store in the database: a URL for Blob, or a path
// (products/... for files, /products/... for images) for local disk.
export async function saveFile(file: File, kind: StoredKind): Promise<string> {
  const name = `${crypto.randomUUID()}-${file.name}`
  if (blobEnabled()) {
    const blob = await put(`${kind === "file" ? "files" : "images"}/${name}`, file, {
      access: "public",
      addRandomSuffix: true,
    })
    return blob.url
  }
  if (kind === "file") {
    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${name}`
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()))
    return filePath
  }
  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await file.arrayBuffer()))
  return imagePath
}

export async function readStoredFile(ref: string): Promise<Buffer | null> {
  try {
    if (isUrl(ref)) {
      const res = await fetch(ref)
      if (!res.ok) return null
      return Buffer.from(await res.arrayBuffer())
    }
    return await fs.readFile(ref)
  } catch {
    return null
  }
}

export async function removeStoredFile(ref: string, kind: StoredKind) {
  try {
    if (isUrl(ref)) {
      await del(ref)
    } else if (kind === "image") {
      await fs.unlink(path.join("public", ref))
    } else {
      await fs.unlink(ref)
    }
  } catch {
    // Already gone, or a seeded demo reference with no file behind it.
  }
}

export function extensionOf(ref: string) {
  const clean = ref.split("?")[0]
  return clean.includes(".") ? clean.split(".").pop() : "bin"
}
