import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-10`}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((each) => (
        <div
          className="text-xl bg-gray-600  rounded  px-2 py-4 h-50"
          key={each}
        >
          <Skeleton />
          <div className="mt-4 text-sm h-20">
            <Skeleton count={3} />
          </div>
          <Skeleton />
        </div>
      ))}
    </div>
  );
};

export default Loader;
