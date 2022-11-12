import React, { memo, useEffect, useState } from "react";
import {
  FaSlidersH,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaStar,
} from "react-icons/fa";
import { GoRepoForked, GoHistory } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import {
  filterRepos,
  selectTerm,
  setOrder,
  setSize,
  setPage,
  setSort,
  selectSize,
  selectOrder,
  selectPage,
  selectSort,
} from "./searchSlice";

import styles from "./search.module.css";
import getWindowDimensions from "../../features/windowSize";

import DropdownMenu from "../../features/dropdown";

const Filter = ({}) => {
  const { width } = getWindowDimensions();

  const sort = useSelector(selectSort);
  const order = useSelector(selectOrder);
  const page = useSelector(selectPage);
  const size = useSelector(selectSize);
  const search = useSelector(selectTerm);

  const [show, setShow] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!firstLoad) {
      if (search.trim() !== "") {
        dispatch(filterRepos({ search, sort, order, page, size }));
      }
    }
  }, [sort, order]);

  const handleSort = (value) => {
    setFirstLoad(false);
    dispatch(setPage(1));
    dispatch(setSize(30));
    dispatch(setSort(value));
    setShow(false);
  };

  const handleOrder = () => {
    setFirstLoad(false);
    dispatch(setPage(1));
    dispatch(setSize(30));
    if (order === "desc") {
      dispatch(setOrder("asc"));
    } else {
      dispatch(setOrder("desc"));
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  const buttons = (
    <>
      <div className={`${show ? "flex justify-end" : ""} `}>Sort by</div>
      <div className="flex justify-end gap-2 lg:gap-4">
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
    <div className={`flex items-end z-10 py-2`}>
      {width > 570 ? (
        <div className="mt-2 mx-4 flex items-end justify-start gap-4">
          {buttons}
        </div>
      ) : (
        <div className="mt-2 mr-4 z-40">
          <DropdownMenu
            main={
              <div className="w-full flex justify-end">
                <button
                  className={`rounded bg-gray-600 p-2 tooltip text-md cursor-pointer `}
                  onClick={handleShow}
                >
                  <FaSlidersH className={`${show ? "text-blue-400" : ""}`} />
                  {/* <div className={`tooltipBox`}>
                    <p className="tooltipText"> Filters</p>
                  </div> */}
                </button>
              </div>
            }
            items={<div className="w-full">{buttons}</div>}
            show={show}
            setShow={setShow}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Filter);
