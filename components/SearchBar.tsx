"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface ISearch {
  search: string;
}
const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (data: ISearch) => {
    console.log(data.search);
    router.push(`/list?name=${data.search}`);
  };

  const { handleSubmit, register } = useForm<ISearch>();
  return (

      <form
        onSubmit={handleSubmit(handleSearch)}
        className="bg-gray-100 flex items-center justify-between p-2 rounded-md flex-1"
      >
        <input
          {...register("search")}
          className="flex-1 bg-transparent outline-none "
          type="text"
          placeholder="Search"
        />
        <button className="cursor-pointer">
          <Image src="/search.png" alt="search" width={16} height={16} />
        </button>
      </form>

  );
};

export default SearchBar;
