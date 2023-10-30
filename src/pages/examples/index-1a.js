// Option 1a: fetch products on the server side (in getStaticProps)
import { getProducts } from '@/lib/products'
import Head from 'next/head'

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}

export default function HomePage({ products }) {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main>
        <h1>_Next Shop_</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
