import React, { memo, useEffect, useState } from "react";
import {
  FaSlidersH,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaStar,
} from "react-icons/fa";
import { GoRepoForked, GoHistory } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import { filterRepos, selectTerm } from "./searchSlice";

import styles from "./search.module.css";
import getWindowDimensions from "../../features/windowSize";

const Filter = ({}) => {
  const { width } = getWindowDimensions();

  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [show, setShow] = useState(false);
  const search = useSelector(selectTerm);

  const dispatch = useDispatch();

  useEffect(() => {
    if (search.trim() !== "") {
      dispatch(filterRepos({ search, sort, order }));
    }
  }, [sort, order]);

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

  const handleShow = () => {
    console.log("here");
    setShow(!show);
  };

  const buttons = (
    <>
      <div>Sort by</div>
      <div className="grid grid-cols-4 gap-2 lg:gap-4">
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
    </>
  );

  return (
    <div className={`flex items-end z-10 py-2 ${styles.sticky}`}>
      {width > 1059 ? (
        <div className="mt-2 mx-4 flex items-end justify-start gap-4">
          {buttons}
        </div>
      ) : (
        <div className="mt-2 mr-4 z-40">
          <div className="w-full flex justify-end">
            <button
              className={`rounded bg-gray-600 p-2 tooltip text-md cursor-pointer `}
              onClick={handleShow}
            >
              <FaSlidersH className={`${show ? "text-blue-400" : ""}`} />
              <div className={`tooltipBox`}>
                <p className="tooltipText"> Filters</p>
              </div>
            </button>
          </div>
          {show && <div className="w-full mt-2">{buttons}</div>}
        </div>
      )}
    </div>
  );
};

export default memo(Filter);
