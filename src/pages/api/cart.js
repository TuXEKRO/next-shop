import { fetchJson } from "@/lib/api"

const { CMS_URL } = process.env

export default async function handleCart(req, res) {
    switch (req.method) {
        case "GET":
            return handleGetCart(req, res)
        case "POST":
            return handlePostCart(req, res)
        default:
            res.status(405).end()
    }
}

function stripCartItem(cartItem) {
    return {
        id: cartItem.id,
        product: {
            id: cartItem.product.id,
            title: cartItem.product.title,
            price: cartItem.product.price,
            image: CMS_URL + cartItem.product.picture.formats.small.url
        },
        quantity: cartItem.quantity,
        subtotal: cartItem.product.price * cartItem.quantity
    }
}

async function handleGetCart(req, res) {
    const { jwt } = req.cookies
    if (!jwt) {
        res.status(401).end()
        return;
    }
    try {
        const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
            headers: { "Authorization": `Bearer ${jwt}` },
        })
        // res.status(200).json(cartItems)
        res.status(201).json(cartItems.map(stripCartItem))
    } catch (error) {
        res.status(401).end()
    }
}

async function handlePostCart(req, res) {
    const { jwt } = req.cookies
    if (!jwt) {
        res.status(401).end()
        return;
    }
    const { productId, quantity } = req.body

    try {
        const response = await fetchJson(`${CMS_URL}/cart-items`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product: productId, quantity })
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(401).end()
    }
}