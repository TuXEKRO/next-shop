export default async function handleRevalidate(req, res) {
    console.log("[API/REVALIDATE] Received: ", req.body);
    const event = req.body
    if (event.model === "product") {
        const id = event.entry.id
        await Promise.all([
            res.revalidate("/"),
            res.revalidate("/products/${id}"),
        ])
    }
    res.status(204).end()
}