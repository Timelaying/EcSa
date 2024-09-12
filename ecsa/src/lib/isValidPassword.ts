export async function isValidPassword(password: string, hashedPassword: string){
    return (await hashedPasswordq(password)) === hashedPassword
}

async function hashedPasswordq (password: string) {
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))

    return Buffer.from(arrayBuffer).toString("base64")
}