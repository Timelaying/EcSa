"use server"

import { z } from "zod";

const emailSchema = z.string().email()

export async function emailOrderHistory(prevState: unknown, formData: FormData)
: 
Promise<{ message?: string; error?: string}> {
    const result = emailSchema.safeParse(formData.get("email"))

    if (result.success === false){
        return {error: "Invalid email address"}
    }
}