import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";


const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}

export default function CategorPage({ params }: Props) {

  const { id } = params;
  const products = seedProducts.filter(product => product.gender === id);

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  }

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Artículos ${labels[id]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}