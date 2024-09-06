import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { toggleProductAvailability } from "../../_actions/product";

export function ActiveToggeDropdownIteam({id, isAvailableForPurchase}:{id: String, isAvailableForPurchase: Boolean}){
    const [isPending, startTransition] = useTransition()
    return(
        <DropdownMenuItem onClick={()=>{startTransition(async () => {await toggleProductAvailability(id, !isAvailableForPurchase)}}>

        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem(){
    return(

    )
}