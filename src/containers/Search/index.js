import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";

import {
  loadRepos,
  selectData,
  selectRepos,
  selectLoading,
  selectStaus,
} from "./searchSlice";

import styles from "./search.module.css";

const Search = () => {
  const data = useSelector(selectData);
  const repos = useSelector(selectRepos);
  const loading = useSelector(selectLoading);
  const status = useSelector(selectStaus);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      dispatch(loadRepos(search));
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className={status === "found" ? styles.barFade : ""}>
        <div className="mt-20 text-4xl text-white flex justify-center">
          <label className="cursor-text" htmlFor="default-search">
            Search repositories
          </label>
        </div>
        <div className="my-4 text-3xl m-auto w-3/4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-400 text-sm">
                <FaSearch />
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Repo names ..."
                required
                autoFocus
                value={search}
                onChange={handleChange}
              />
              <button
                onClick={handleSearch}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {!loading && (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-10`}
        >
          {data.map((each) => (
            <Card data={each} key={each.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
