import React, { useEffect, useState } from "react";

import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaStar,
} from "react-icons/fa";
import { GoRepoForked, GoHistory } from "react-icons/go";

import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import Loader from "./Skeleton";

import {
  loadRepos,
  selectData,
  selectRepos,
  selectLoading,
  selectStaus,
  clearSearch,
  filterRepos,
} from "./searchSlice";

import styles from "./search.module.css";

const Search = () => {
  const data = useSelector(selectData);
  const repos = useSelector(selectRepos);
  const loading = useSelector(selectLoading);
  const status = useSelector(selectStaus);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState("desc");

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      dispatch(loadRepos({ search }));
    }
  };

  useEffect(() => {
    if (search.trim() !== "") {
      dispatch(filterRepos({ search, sort, order }));
    }
  }, [sort, order]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch("");
    dispatch(clearSearch());
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleOrder = () => {
    if (order === "desc") {
      setOrder("asc");
    } else {
      setOrder("desc");
    }
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

      {status === "found" && (
        <div
          className={`bg-black border-b-2 flex items-end z-10 py-2 ${styles.sticky}`}
        >
          <div className="mt-2 mx-4 flex items-end justify-start gap-4">
            <div>Sort by</div>
            <div className="grid grid-cols-4 gap-4">
              <button
                className={`${styles.sortButton} tooltip `}
                onClick={() => handleSort("stars")}
              >
                <FaStar
                  className={`${
                    sort === "stars"
                      ? "text-blue-400 pb-1 border-b-2 border-blue-400"
                      : ""
                  }`}
                />
                <div className={`tooltipBox`}>
                  <p className="tooltipText">Star count</p>
                </div>
              </button>

              <button
                className={`${styles.sortButton} tooltip `}
                onClick={() => handleSort("forks")}
              >
                <GoRepoForked
                  className={`${
                    sort === "forks"
                      ? "text-blue-400 pb-1 border-b-2 border-blue-400"
                      : ""
                  }`}
                />
                <div className={`tooltipBox`}>
                  <p className="tooltipText"> Fork count</p>
                </div>
              </button>

              <button
                className={`${styles.sortButton} tooltip`}
                onClick={() => handleSort("updated")}
              >
                <GoHistory
                  className={`${
                    sort === "updated"
                      ? "text-blue-400 pb-1 border-b-2 border-blue-400"
                      : ""
                  }`}
                />
                <div className={`tooltipBox`}>
                  <p className="tooltipText"> Last update</p>
                </div>
              </button>
              <button
                className={`${styles.sortButton} tooltip`}
                onClick={handleOrder}
              >
                {order === "desc" ? (
                  <>
                    <FaSortAmountDown />
                    <div className={`tooltipBox`}>
                      <p className="tooltipText">Descending</p>
                    </div>
                  </>
                ) : (
                  <>
                    <FaSortAmountUpAlt />
                    <div className={`tooltipBox`}>
                      <p className="tooltipText"> Ascending</p>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
