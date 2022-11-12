import React from "react";

import { FaSearch } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import Loader from "./Skeleton";

import {
  loadRepos,
  selectData,
  selectLoading,
  selectStaus,
  clearSearch,
  selectTerm,
  setTerm,
} from "./searchSlice";

import styles from "./search.module.css";
import Pagination from "./Pagination";

const Search = () => {
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const status = useSelector(selectStaus);
  const dispatch = useDispatch();
  const term = useSelector(selectTerm);

  const handleSearch = (event) => {
    event.preventDefault();
    if (term.trim() !== "") {
      dispatch(loadRepos({ term }));
    }
  };

  const handleChange = (event) => {
    dispatch(setTerm(event.target.value));
  };

  const handleClear = () => {
    dispatch(setTerm(""));
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
                value={term}
                onChange={handleChange}
              />
              <button onClick={handleSearch} className={styles.searchbutton}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

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

          {status === "failed" && (
            <div className="flex justify-center mt-10">
              <div className={styles.warningbox}>
                <p>Request Failed</p>

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
              <Pagination />
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
