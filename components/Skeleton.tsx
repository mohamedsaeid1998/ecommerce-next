const Skeleton = ({ num, category }: { num: number; category?: string }) => {
  return (
    <div
      className={`mt-12  flex  animate-pulse ${
        category
          ? "w-full px-4 gap-4 md:gap-8 overflow-x-scroll scrollbar-hide  "
          : " flex gap-x-8 gap-y-16 flex-wrap justify-between"
      }  `}
    >
      {Array.from({ length: num }, (_, idx) => (
        <div
          key={idx}
          className={` flex ${
            category ? "sm:w-[214px] lg:w-[214px] " : "w-full flex-col sm:w-[45%] lg:w-[22%] gap-3 "
          } `}
        >
          <div className={`w-full  h-80  bg-gray-300 rounded-md`} />
          {!category && (
            <>
              {" "}
              <div className="w-full flex justify-between ">
                <div className="w-36 h-6 bg-gray-300 rounded-md" />
                <div className="w-12 h-6 bg-gray-300 rounded-md  ml-auto" />
              </div>
              <div className="w-full h-3 bg-gray-300 rounded-md " />
              <div className="w-1/2 h-3 bg-gray-300 rounded-md " />
              <div className="w-1/2 h-8 bg-gray-300 rounded-2xl " />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
