import Page from "@/components/Page";
import { getProduct, getProducts } from "@/lib/products";
import Image from "next/image";

// Valida todas las rutas posibles
export async function getStaticPaths() {
    const products = await getProducts()
    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() }
        })),
        fallback: "blocking", // Permite generar una pagina nueva en caso de no estar en el listado (mantiene "bloqueado" al cliente)
    }
}

// Llama a la pagina para generar una nueva
export async function getStaticProps({ params: { id } }) {
    try {
        const product = await getProduct(id)
        return {
            props: { product },
        }
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            return { notFound: true }
        }
        throw error
    }
}

export default function ProductPage({ product }) {
    return (
        <>
            <Page title={product.title}>
                <div className="border flex flex-wrap lg:flex-nowrap">
                    <Image src={product.pictureUrl} alt="" width={640} height={480} className="w-full" />
                    <div className=" text-slate-600 mt-3 lg:ml-4">
                        <p className="text-sm">
                            {product.description}
                        </p>
                        <p className="text-lg font-bold mt-2">
                            {product.price}
                        </p>
                    </div>
                </div>
            </Page>
        </>
    )
}