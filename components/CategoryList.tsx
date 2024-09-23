import { getCategories } from "@/actions/products.actions";

import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {

  const categories = await getCategories();
  
  return (
    <>
      <div className=" px-4 overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 md:gap-8">
          {categories?.items?.map(async (category) => {
            // const imageUrl =
            //   category.media?.mainMedia?.image?.url || "/category.png";
            // const ImageBlurData = await getBase64(imageUrl);
            return (
              <Link
                href={`/list?cat=${category.slug}`}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 xl:w-1/6"
                key={category._id}
              >
                <div className="relative bg-slate-100 w-full h-96">
                  <Image
                    src={category.media?.mainMedia?.image?.url || "/category.png"}
                    alt="category image"
                    fill
                    sizes="20vw"
                    className="object-cover"
                    // blurDataURL={ImageBlurData}
                    // placeholder="blur"
                  />
                </div>
                <h3 className="mt-8 font-light text-xl tracking-wide">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
