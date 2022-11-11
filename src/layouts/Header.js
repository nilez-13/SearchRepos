import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { clearSearch, selectStaus } from "../containers/Search/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../containers/Search/Filter";

const Header = () => {
  const status = useSelector(selectStaus);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch(clearSearch());
    navigate("/");
  };

  function checkShow() {
    let show = false;
    if (status === "found") {
      show = true;
    } else if (location.pathname.includes("detail")) {
      show = true;
    }
    return show;
  }

  function checkFound() {
    if (status === "found" && location.pathname === "/") {
      return true;
    } else {
      return false;
    }
  }

  return checkShow() ? (
    <header
      className={`sticky top-0 z-20  flex  justify-between bg-black border-b-2 `}
    >
      <div className="flex flex-wrap">
        <span className="  ml-2 px-2 py-2 cursor-pointer text-2xl md:text-3xl lg:text-4xl">
          <FaHome className="mt-1" onClick={handleClear} />
        </span>
        <span
          className=" font-bold ml-2  py-2 cursor-pointer text-2xl md:text-3xl lg:text-4xl"
          onClick={handleClear}
        >
          GitHub Repo Search
        </span>
      </div>
      {checkFound() && <Filter search="node" />}
    </header>
  ) : null;
};

export default Header;
