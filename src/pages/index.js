// Option 1b: fetch products on the server side 
// but with Incremental Static Regeneration (in getStaticProps)
import Page from '@/components/Page'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export async function getStaticProps() {
  const products = await getProducts()
  return {
    props: { products },
  }
}

export default function HomePage({ products }) {
  return (
    <>
      <Page title="Indoor Plants">
        <ul className='grid grid-cols-1 lg:grid-cols-3'>
          {products.map((product) => (
            <li key={product.id} className="flex justify-center items-center">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  )
}
