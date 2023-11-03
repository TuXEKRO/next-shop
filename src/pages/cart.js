import CartTable from '@/components/CartTable';
import Page from '@/components/Page'
import { fetchJson } from '@/lib/api'
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function CartPage() {
    const query = useQuery("cartItems", () => fetchJson("/api/cart"))
    const cartItems = query.data
    // console.log(cartItems);

    return (
        <>
            <Page title="Cart">
                {/* Falta poner circulo de carga y mensaje error. No se si con useMutation llevando toda la logica en un hook aparte */}

                {cartItems && <CartTable cartItems={cartItems} />}
            </Page>
        </>
    )
}
