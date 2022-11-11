import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { clearSearch, selectStaus } from "../containers/Search/searchSlice";
import { useLocation } from "react-router-dom";

const Header = () => {
  const status = useSelector(selectStaus);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClear = () => {
    dispatch(clearSearch());
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

  return checkShow() ? (
    <header
      className={`sticky top-0 z-20   text-4xl flex justify-center cursor-pointer ${
        location.pathname.includes("detail") ? "bg-black border-b-2" : ""
      }`}
      onClick={handleClear}
    >
      <span className="  px-4 py-2">
        <FaHome className="mt-1" />
      </span>
      <span className=" font-bold ml-4  py-2">GitHub Repo Search</span>
    </header>
  ) : null;
};

export default Header;
