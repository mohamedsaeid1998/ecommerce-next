import CategoryList from "@/components/CategoryList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const HomePage = async () => {
  // const wixClient = await wixClientServer();

  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();
  //     console.log(res);
  //   };
  //   getProducts();
  // }, [wixClient]);

  return (
    <>
      <section className="">
        <Slider />
      </section>
      <MaxWidthWrapper>
        <h2 className="text-2xl">Featured Products</h2>
        <Suspense fallback={<Skeleton num={4} />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </MaxWidthWrapper>
      <section className="mt-24">
        <h2 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h2>
        <Suspense fallback={<Skeleton num={7} category={"category"} />}>
          <CategoryList />
        </Suspense>
      </section>

      <MaxWidthWrapper>
        <h2 className="text-2xl">New Products</h2>
        <Suspense fallback={<Skeleton num={4} />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </MaxWidthWrapper>
    </>
  );
};
export default HomePage;
