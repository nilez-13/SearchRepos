import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { clearSearch, selectStaus } from "../containers/Search/searchSlice";

const Header = () => {
  const status = useSelector(selectStaus);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearSearch());
  };

  return status === "found" ? (
    <header
      className="sticky top-0 z-50 h-10  border-b-2 flex justify-center cursor-pointer"
      onClick={handleClear}
    >
      <span className="  px-4 py-2">
        <FaHome className="mt-1" />
      </span>
      <span className="text-xl font-bold ml-4  py-2">GitHub Repo Search</span>
    </header>
  ) : null;
};

export default Header;
