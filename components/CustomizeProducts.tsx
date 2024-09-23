"use client";

import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";

interface IProps {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}

const CustomizeProducts = ({ productId, variants, productOptions }: IProps) => {
  const [selectOptions, setSelectOptions] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectVariant, setSelectVariant] = useState<products.Variant>({});

  const handleSelectOptions = (optionType: string, choice: string) => {
    setSelectOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectVariant(variant!);
  }, [variants, selectOptions]);

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant?.stock?.quantity &&
        variant?.stock?.quantity > 0
      );
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {productOptions.map((option) => (
          <>
            <div className="flex flex-col gap-4" key={option.name}>
              <h3 className="font-medium ">Choose a {option.name}</h3>
              <ul
                className={` ${
                  option.name === "Color"
                    ? "flex items-center gap-3 [&_li]:size-8 [&_li]:relative [&_li]:ring-1 [&_li]:ring-gray-300 [&_li]:rounded-full [&_div]:top-1/2 [&_div]:left-1/2 [&_div]:absolute [&_div]:transform [&_div]:-translate-x-1/2 [&_div]:-translate-y-1/2"
                    : "flex items-center gap-3 [&_li]:ring-1 [&_li]:py-1 [&_li]:px-4 [&_li]:rounded-md"
                } `}
              >
                {option.choices?.map((choice) => {
                  const disabled = !isVariantInStock({
                    ...selectOptions,
                    [option.name!]: choice.description!,
                  });
                  const selected =
                    selectOptions[option.name!] === choice.description!;

                  const clickHandler = disabled
                    ? undefined
                    : () =>
                        handleSelectOptions(option.name!, choice.description!);

                  return option.name === "Color" ? (
                    <li
                      style={{
                        backgroundColor: choice.value,
                        cursor: disabled ? "not-allowed" : "pointer",
                      }}
                      onClick={clickHandler}
                    >
                      {selected && (
                        <div className=" size-10 rounded-full ring-2 " />
                      )}
                      {disabled && (
                        <div className=" w-10 h-[2px]  bg-red-400  rotate-45 " />
                      )}
                    </li>
                  ) : (
                    <li
                      className=" bg-white ring-redColor text-redColor"
                      style={{
                        cursor: disabled ? "not-allowed" : "pointer",
                        backgroundColor: selected
                          ? "#f35c7a"
                          : disabled
                          ? "#FBCFE8"
                          : "white",
                        color: selected || disabled ? "white" : "#f35c7a",
                        boxShadow: disabled ? "none" : "",
                      }}
                      onClick={clickHandler}
                    >
                      {choice.description}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ))}
        <AddProduct
          productId={productId}
          variantId={
            selectVariant?._id || "00000000-0000-0000-0000-000000000000"
          }
          stockNumber={selectVariant?.stock?.quantity || 0}
        />
      </div>
    </>
  );
};

export default CustomizeProducts;
