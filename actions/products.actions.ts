"use server"

import { IProducts } from "@/interfaces";
import { wixClientServer } from "@/lib/WixClientServer";

export const getProducts = async ({ categoryId, limit, productsNumber, searchParams }: IProducts) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products.queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || productsNumber)
    .skip(searchParams?.page ? parseInt(searchParams?.page) * (limit || productsNumber) : 0)

  let response;
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ")
    if (sortType === "asc") {
      response = await productQuery.ascending(sortBy).find()

    }
    if (sortType === "desc") {
      response = await productQuery.descending(sortBy).find()
    }
  } else {
    response = await productQuery.find();
  }




  return response
}




export const getCategories = async () => {
  const wixClient = await wixClientServer();

  const response = await wixClient.collections.queryCollections().find()

  return response
}

export const getCategoryDetails = async (slug: string) => {
  const wixClient = await wixClientServer();

  const response = await wixClient.collections.getCollectionBySlug(slug)

  return response
}

export const getProductDetails = async (slug: string) => {
  const wixClient = await wixClientServer();

  const response = await wixClient.products.queryProducts()
    .eq("slug", slug)
    .find();


  return response
}