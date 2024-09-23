import { getProductDetails } from "@/actions/products.actions";
import AddProduct from "@/components/AddProduct";
import CustomizeProducts from "@/components/CustomizeProducts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductImages from "@/components/ProductImages";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    slug: string;
  };
}

const SinglePage = async ({ params }: IProps) => {
  const products = await getProductDetails(params.slug);

  console.log();
  if (!products?.items[0]) {
    return notFound();
  }
  const product = products?.items[0];

  return (
    <>
      <MaxWidthWrapper className="mt-0 relative flex flex-col lg:flex-row gap-16">
        {/* IMAGES */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
          <ProductImages items={product.media?.items} />
        </div>
        {/* TEXT */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl font-medium">{product.name}</h2>
          <p className="text-gray-500">{product?.description}</p>
          <div className="h-[2px] bg-gray-100" />
          {product.price?.price === product.price?.discountedPrice ? (
            <span className=" text-2xl font-medium">
              {product.price?.price}
            </span>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-gray-500 line-through text-xl">
                {product.price?.price}
              </span>
              <span className=" text-2xl font-medium">
                {product.price?.discountedPrice}
              </span>
            </div>
          )}

          <div className="h-[2px] bg-gray-100" />
          {product.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <AddProduct productId={product._id!} variantId="00000000-0000-0000-0000-000000000000" stockNumber= {product.stock?.quantity || 0} />
          )}

          <div className="h-[2px] bg-gray-100" />
          {product.additionalInfoSections?.map((section: any) => (
            <div className="text-sm" key={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SinglePage;
