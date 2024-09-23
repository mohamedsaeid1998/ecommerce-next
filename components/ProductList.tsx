import { getProducts } from "@/actions/products.actions";
import { IProductList } from "@/interfaces";
import { formatPrice } from "@/lib/utils";
import { products } from "@wix/stores";
import DOMPurity from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

const productsNumber = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: IProductList) => {
  const res = await getProducts({
    categoryId,
    limit,
    productsNumber,
    searchParams,
  });

  return (
    <figure className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-between">
      {res?.items?.map(async (product: products.Product) => {
        const mainImageUrl =
          product.media?.mainMedia?.image?.url || "/product.png";
        const secondImageUrl =
          product.media?.items?.[1]?.image?.url || "/product.png";
        // const mainImageBlurData = await getBase64(mainImageUrl);
        // const secondImageBlurData = await getBase64(secondImageUrl);

        return (
          <Link
            href={`/${product.slug}`}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] banner-item"
            key={product._id}
          >
            <div className="relative w-full h-80 ">
              <Image
                src={mainImageUrl}
                alt="Product image"
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in duration-500 "
                // placeholder="blur"
                // blurDataURL={mainImageBlurData}
              />
              {product.media?.items && (
                <>
                  <Image
                    src={secondImageUrl}
                    alt="Product image"
                    fill
                    sizes="25vw"
                    className="absolute object-cover rounded-md "
                    // placeholder="blur"
                    // blurDataURL={secondImageBlurData}
                  />
                  <div className="banner-glass"></div>
                </>
              )}
            </div>
            <figcaption className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                {product.price && (
                  <span className="font-semibold">
                    {formatPrice(product.price?.price as number)}
                  </span>
                )}
              </div>
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurity.sanitize(
                    product.additionalInfoSections?.find(
                      (section) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              />
              <button className="text-redColor ring-1 ring-redColor py-2 px-4 text-sm w-max hover:bg-redColor hover:text-white border-redColor rounded-2xl">
                Add to Cart
              </button>
            </figcaption>
          </Link>
        );
      })}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res?.currentPage || 0}
          hasPrev={res?.hasPrev()!}
          hasNext={res?.hasNext()!}
        />
      ) : null}
    </figure>
  );
};

export default ProductList;
