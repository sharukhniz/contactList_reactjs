import React from "react";
import Style from "./AddButton.module.css";
import { useDispatch } from "react-redux";
import { setShowAddModal } from "../../redux/ContactSlice";

const AddButton = () => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(setShowAddModal(true));
  };

  return (
    <div className={Style.addButton}>
      <button onClick={handleShowModal} className={Style.addUser}>
        Add Contact
      </button>
    </div>
  );
};

export default AddButton;
