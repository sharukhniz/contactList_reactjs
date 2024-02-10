import React from "react";
import Style from "./Header.module.css";
import Searchbar from "../../Searchbar/Searchbar";

const Header = () => {
  return (
    <div className={Style.header}>
      <div className={Style.container}>
        <h1>Contact List</h1>
        <Searchbar />
      </div>
    </div>
  );
};

export default Header;
