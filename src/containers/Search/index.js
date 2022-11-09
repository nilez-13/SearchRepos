import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <>
      <div className="mt-20 text-4xl text-white flex justify-center">
        <label className="cursor-text" htmlFor="default-search">
          Search repositories
        </label>
      </div>
      <div className="my-4 text-3xl m-auto w-3/4">
        <form>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-400 text-sm">
              <FaSearch />
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              autoFocus
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {false && (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((each) => (
            <div className="p-20 text-xl bg-gray-400 rounded">{each}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
