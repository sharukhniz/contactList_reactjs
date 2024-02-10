import React from "react";
import Style from "./Searchbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getContact } from "../../redux/ContactSlice";

const Searchbar = () => {
  const dispatch = useDispatch();
  const { limit, page } = useSelector((state) => state.contacts);

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    dispatch(getContact({ search: newSearch, page, limit }));
  };

  return (
    <>
      <div className="search">
        <form className={Style.search_bar}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className={Style.search_input}
          />
        </form>
      </div>
    </>
  );
};

export default Searchbar;
