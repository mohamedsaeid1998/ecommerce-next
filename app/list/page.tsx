import { getCategoryDetails } from "@/actions/products.actions";
import Filter from "@/components/Filter";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

const ListPage = async ({
  searchParams,
}: {
  searchParams: { cat: string };
}) => {
  const categoryProducts = await getCategoryDetails(
    searchParams.cat || "all-products"
  );


  return (
    <>
      <MaxWidthWrapper className="mt-0 relative">
        {/* CAMPAIGN */}
        <div className=" hidden sm:flex bg-pink-50 px-4 justify-between h-64">
          {/* TEXT */}
          <div className="flex flex-col w-2/3 items-center justify-center space-y-8">
            <h2 className="text-4xl font-semibold leading-[48px] text-gray-700">
              Grab up to 50% off on
              <br />
              Selected Products
            </h2>
            <Button className="bg-redColor hover:bg-redColor rounded-3xl w-max text-sm">
              Buy Now
            </Button>
          </div>
          {/* PHOTO */}
          <div className="w-1/3 relative">
            <Image
              src="/woman.png"
              alt="Image"
              fill
              sizes="100%"
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* FILTRATION */}
        <Filter />
        {/* PRODUCTS */}
        <h3 className="mt-12 text-xl font-semibold">{categoryProducts.collection?.name} For You!</h3>
        <Suspense fallback={categoryProducts.collection &&<Skeleton num={categoryProducts.collection?.numberOfProducts}/>}>
          <ProductList
            categoryId={
              categoryProducts.collection?._id ||
              "00000000-000000-000000-000000000001"
            }
            searchParams={searchParams}
          />
        </Suspense>
      </MaxWidthWrapper>
    </>
  );
};

export default ListPage;
