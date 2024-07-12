"use client";

import { useEffect, useState } from "react";
import { ProductImage, QuantitySelector } from "@/components";

import { useCartStore } from "@/store";
import Link from "next/link";
import { currencyFormat } from "@/utils/currencyFormat";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando ....</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <Link href={`/product/${product.slug}`}>
              <p className="hover:underline cursor-pointer">
                {product.size} - {product.title}
              </p>
            </Link>
            <p>{currencyFormat(product.price)}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) => {
                updateProductQuantity(product, value);
              }}
            />
            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3"
            >
              Quitar producto
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
