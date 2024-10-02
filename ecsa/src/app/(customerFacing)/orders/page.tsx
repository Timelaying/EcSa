"use cleint"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function MyOrdersPage(){
    return <form className="max-2-xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>
                    Enter your email and we will email you your order history and download links
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" required name="email" id="email" />
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
        </Card>
    </form>
}

function SubmitButton(){
    const {pending} = useFormState()
}