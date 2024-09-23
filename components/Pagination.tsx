"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface IProps {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = ({ currentPage, hasPrev, hasNext }: IProps) => {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();


  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page",pageNumber.toString())
    replace(`${pathname}?${params.toString()}`)
  };

  return (
    <>
      <div className="mt-12 flex justify-between w-full">
        <Button
          className="bg-redColor hover:bg-redColor text-white text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={!hasPrev}
          onClick={() => createPageUrl(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          className="bg-redColor hover:bg-redColor text-white text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={!hasNext}
          onClick={() => createPageUrl(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
