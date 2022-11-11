import React, { memo, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  filterRepos,
  selectTerm,
  setSize,
  setPage,
  selectSize,
  selectOrder,
  selectPage,
  selectSort,
  selectRepos,
} from "./searchSlice";

import styles from "./search.module.css";
import getWindowDimensions from "../../features/windowSize";

const Filter = ({}) => {
  const { width } = getWindowDimensions();

  const repos = useSelector(selectRepos);
  const sort = useSelector(selectSort);
  const order = useSelector(selectOrder);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const search = useSelector(selectTerm);
  const [firstLoad, setFirstLoad] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!firstLoad) {
      if (search.trim() !== "") {
        dispatch(filterRepos({ search, sort, order, page, size }));
      }
    }
  }, [size, page]);

  const handleSize = (event) => {
    setFirstLoad(false);
    dispatch(setSize(event.target.value));
  };

  const handlePage = (value) => {
    setFirstLoad(false);

    dispatch(setPage(value));
  };

  function shorten(value) {
    let short = (value / 1000).toFixed(2);

    return short;
  }

  return (
    <div className="border-2 rounded mt-10 ">
      <div className="flex justify-between items-center">
        <div className="p-2 inline-flex items-center">
          <span className="text-xs">Show</span>{" "}
          <select
            className="inputbox text-xs w-12 p-0 mx-2"
            style={{ height: "30px" }}
            value={size || 10}
            onChange={handleSize}
          >
            {[10, 30, 50, 100].map((each) => (
              <option value={each} key={each}>
                {each}
              </option>
            ))}
          </select>
          <div className="flex items-center">
            <span
              onClick={() => {
                if (1 === page) {
                  return;
                }
                handlePage(page - 1);
              }}
              className={`${
                1 === page
                  ? "opacity-25 pointer-events-none"
                  : "hover:bg-primary hover:text-white"
              } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center ml-1`}
            >
              <FaChevronLeft />
            </span>
            <span
              onClick={() => {
                if (Math.ceil(repos.total_count / size) === page) {
                  return;
                }
                handlePage(page + 1);
              }}
              className={`${
                Math.ceil(repos.total_count / size) === page
                  ? "opacity-25 pointer-events-none"
                  : "hover:bg-primary hover:text-white"
              } w-8 h-8 rounded cursor-pointer inline-flex items-center justify-center`}
            >
              <FaChevronRight />
            </span>
          </div>
        </div>

        <div>
          <span className="mr-5 text-xs">
            Page {page} of {Math.ceil(repos.total_count / size)}
            <span className="pl-4">
              Total Data :{" "}
              {repos.total_count > 9999
                ? `${shorten(repos.total_count)} K`
                : repos.total_count}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
