"use client";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <div className="mt-12 flex justify-between ">
        {/* LEFT */}
        <div className="flex gap-6 flex-wrap">
          <select
            name="type"
            id=""
            className="py-2  px-4 rounded-2xl text-sm font-medium bg-[#EBEDED]"
            onChange={handleFilterChange}
          >
            <option>Type</option>
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
          </select>
          <Input
            type="text"
            name="min"
            placeholder="min price"
            className="text-xs rounded-2xl pl-2 w-28 ring-1 ring-gray-400"
            onChange={handleFilterChange}
          />
          <Input
            type="text"
            name="max"
            placeholder="max price"
            className="text-xs rounded-2xl pl-2 w-28 ring-1 ring-gray-400"
            onChange={handleFilterChange}
          />

          <select
            name="cat"
            id=""
            className="py-2  px-4 rounded-2xl text-sm font-medium bg-[#EBEDED]"
            onChange={handleFilterChange}
          >
            <option>Category</option>
            <option value="">New Arrival</option>
            <option value="">Popular</option>
          </select>

          <select
            name=""
            id=""
            className="py-2 px-4 rounded-2xl text-sm font-medium bg-[#EBEDED]"
            onChange={handleFilterChange}
          >
            <option>All filters</option>
          </select>
        </div>
        {/* RIGHT */}
        <div className=" ">
          <select
            name="sort"
            id=""
            className="py-2  px-4 rounded-2xl text-sm font-medium bg-white ring-1 ring-gray-400"
            onChange={handleFilterChange}
          >
            <option>Sort By</option>
            <option value="asc price">Price (Low to high)</option>
            <option value="desc price">Price (high to low)</option>
            <option value="asc lastUpdated">Newest</option>
            <option value="desc lastUpdated">Oldest</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
