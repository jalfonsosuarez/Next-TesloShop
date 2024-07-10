import Link from "next/link";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "../../../../utils/currencyFormat";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default async function Cart({ params }: Props) {
  const { id } = params;

  //! Todo: llamar el server action
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCartOutline size={30} />
              {/* <span className='mx-2'>Pendiente de pago</span> */}
              <span className="mx-2">
                {order!.isPaid ? "Pagada" : "No pagada"}
              </span>
            </div>

            {/* items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.size + " - " + item.product.title}</p>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity} Uds.
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p>{address!.firstName}</p>
              <p>{address!.lastName}</p>
              <p>
                {address!.postalCode} - {address?.city}
              </p>
              <p>{address!.countryId}</p>
              <p>Teléfono: {address!.phone}</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">
              Confirmación de la compra
            </h2>
            <div className="grid grid-cols-2">
              <span>No. de productos</span>
              <span className="text-right">
                {order!.itemsInOrder} artículos
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order!.isPaid,
                    "bg-green-700": order!.isPaid,
                  }
                )}
              >
                <IoCartOutline size={30} />
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className="mx-2">
                  {order!.isPaid ? "Pagada" : "No pagada"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
