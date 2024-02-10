import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </>
  );
};

export default MainRouter;
