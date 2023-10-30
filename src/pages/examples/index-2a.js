// Option 2: fetch products on the client side (in useEffect)
// directly from an external API
import { getProducts } from '@/lib/products'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

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
