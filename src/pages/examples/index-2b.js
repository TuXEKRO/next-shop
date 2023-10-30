// Option 2: fetch products on the client side (in useEffect)
// from an internal API route
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/products")
      const products = await response.json()
      setProducts(products)
    })()
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
