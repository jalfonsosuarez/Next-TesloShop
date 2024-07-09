'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";


interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {

    const session = await auth();
    const userId = session?.user.id;
    if ( !userId ) {
        return {
            ok: false,
            message: 'No se ha iniciado sesion de usuario.'
        };
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map( p => p.productId )
            }
        }
    });

    const itemsInOrder = productIds.reduce(( count, p) => count + p.quantity, 0 );

    const { subTotal, tax, total } = productIds.reduce( (totals , item) => {
        
        const productQuantity = item.quantity;
        const product = products.find( product => product.id === item.productId );
        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;
        return totals;

    }, { subTotal: 0, tax: 0, total: 0 });

    try {

        const prismaTx = await prisma.$transaction( async (tx) => {

        
            // 1. Actualizar el stock de los productos
            const updatedProductsPromises = products.map( async (product) => {
                
                // Acumular valores por producto
                const productQuantity = productIds.filter (
                    p => p.productId === product.id
                ).reduce( (acc, item) => item.quantity + acc, 0);
    
                if ( productQuantity === 0 ) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }
                
                return tx.product.update({
                    where: { id: product.id },
                    data:{
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });
    
            const updatedProducts = await Promise.all( updatedProductsPromises );
    
            updatedProducts.forEach( product => {
                if( product.inStock < 0 ) {
                    throw new Error(`${product.title} no tiene existencias suficiente.`)
                }
            })
    
    
            // 2. Crear la orden y el detalle
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    OrderItem: {
                        createMany:{
                            data: productIds.map( p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find( product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            });
    
    
            // 3. Crear la dirección de la orden
            const { country, ...restAddress} = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    postalCode: address.postalCode,
                    city: address.city,
                    phone: address.phone,
                    countryId: country,
                    orderId: order.id,
                }
            });
    
    
            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
    
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            primaTx: prismaTx,
        }
            
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message,
        }
        
    }

}
