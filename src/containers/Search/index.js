import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import Loader from "./Skeleton";
import Filter from "./Filter";

import {
  loadRepos,
  selectData,
  selectRepos,
  selectLoading,
  selectStaus,
  clearSearch,
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
      dispatch(loadRepos({ search }));
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch("");
    dispatch(clearSearch());
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
                className={styles.searchbar}
                placeholder="Search by Repo names ..."
                required
                autoFocus
                value={search}
                onChange={handleChange}
              />
              <button onClick={handleSearch} className={styles.searchbutton}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {status === "found" && <Filter search={search} />}

      {!loading ? (
        <>
          {status === "notfound" && (
            <div className="flex justify-center mt-10">
              <div className={styles.warningbox}>
                <p>No Repo found with with search term</p>

                <p
                  className="underline cursor-pointer text-white text-xs"
                  onClick={handleClear}
                >
                  Clear Search
                </p>
              </div>
            </div>
          )}
          {status === "found" && (
            <>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 mt-10`}
              >
                {data.map((each) => (
                  <Card data={each} key={each.id} />
                ))}
              </div>
              <div className="border-2 rounded mt-10 h-10">Pagination</div>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Search;
