import { useState } from "react";
import Button from "./Button";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { fetchJson } from "@/lib/api";

export default function AddToCartWidget({ productId }) {
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)
    const mutation = useMutation(({ productId, quantity }) => fetchJson("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
    }))
    
    const handleClick = async () => {
        console.log("Should add to cart: ", {productId, quantity});
        await mutation.mutateAsync({ productId, quantity })
        router.push("/cart")
    }

    return (
        <div className="py-2">
            <input type="number" min="1" value={quantity.toString()} onChange={(event) => setQuantity(parseInt(event.target.value))}/>
            {mutation.isLoading ? (
                <span>Loading...</span>
            ) : (
                <Button onClick={handleClick}>
                    Add to cart
                </Button>
            )}
        </div>
    )
}