import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import { ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { ProductMobileSlideShow } from '../../../../components/product/slideshow/ProductMobileSlideShow';

interface Props {
  params: {
    slug: string
  }
}


export default function Product({ params }: Props) {

  const { slug } = params;

  const product = initialData.products.find(product => product.slug === slug);

  if (!product) {
    notFound()
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        {/* mobile slide show */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />

        {/* slideshow para escritorio*/}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/* titulo del producto */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* selector de cantidad */}
        <QuantitySelector quantity={1} />

        {/* botón */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>

      </div>

    </div>
  );
}