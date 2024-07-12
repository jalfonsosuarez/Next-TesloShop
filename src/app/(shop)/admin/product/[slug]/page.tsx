import { GetCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [products, categories] = await Promise.all([
    getProductBySlug(slug),
    GetCategories(),
  ]);
  const product = await getProductBySlug(slug);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  if (!categories) {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Edición del producto";

  return (
    <>
      <Title title={title} subTitle={product?.title || ""} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
