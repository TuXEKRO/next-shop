import Image from "next/image";

export default function CartTable({cartItems}) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].subtotal;
    }
    return (
        <table className="border table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                        <td className="">
                            <Image src={cartItem.product.image} alt={cartItem.product.title} width={100} height={100}/>
                        </td>
                        <td className="px-4 py-2">{cartItem.product.title}</td>
                        <td className="px-4 py-2 text-right">{parseInt(cartItem.product.price).toFixed(2)}$</td>
                        <td className="px-4 py-2 text-right">{cartItem.quantity}</td>
                        <td className="px-4 py-2 text-right">{parseInt(cartItem.subtotal).toFixed(2)}$</td>
                    </tr>
                ))}
                <tr>
                    <td className="px-4 py-2">Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="px-4 py-2 text-right">{total.toFixed(2)}$</td>
                </tr>
            </tbody>
        </table>
    )
}