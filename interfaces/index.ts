export interface ISlider {
  id:number
  title:string
  description:string
  img:string
  url:string
  bg:string
}
export interface IFooterLinks {
  id:number
  title:string
}

export interface IPaymentsImg {
    id: number,
    iconSrc: string,
    alt:string,
  }

export interface IProducts {
  categoryId: string;
  limit?: number;
  productsNumber:number,
  searchParams?:any
  }

export interface IProductList {
    categoryId: string;
    limit?: number;
    searchParams?:any
  }
export interface IAddToCart {
  productId:string
  variantId:string
  stockNumber:number
  }

