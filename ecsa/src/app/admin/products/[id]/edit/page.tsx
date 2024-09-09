import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default function EditProductPage({params: {id},}: {params: {id: string} } }) {
const product = await db.product.findUnique{{where: {id}}}    
return(
    // empty parent -> 
    <> 
    <PageHeader>Edit Product</PageHeader>
    <ProductForm/>
    </> 
)
}