import Link from 'next/link';
import { Title } from '@/components/ui/title/Title';
import Image from 'next/image';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceHolder } from './ui/PlaceHolder';

export default function Cart() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* carrito */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Confirmación de compra</span>
            <Link href="/cart" className='underline mb-5'>
              Editar carrito
            </Link>


            {/* items */}
            <ProductsInCart />
          </div>

          {/* checkout */}
          <PlaceHolder />
        </div>

      </div>
    </div>
  );
}