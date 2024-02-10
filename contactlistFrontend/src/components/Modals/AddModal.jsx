import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  setShowAddModal,
  getContact,
} from "../../redux/ContactSlice";

const AddContactModal = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const { page, limit, search } = useSelector((state) => state.contacts);

  const handleAddUser = (userData) => {
    dispatch(addContact(userData));
    dispatch(setShowAddModal(false));
  };

  const showModal = useSelector((state) => state.contacts.showAddModal);
  const handleClose = () => dispatch(setShowAddModal(false));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddUser({ firstName, lastName, email, phone });
    dispatch(getContact({ page, limit, search }));
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="exampleInputPassword1">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddContactModal;
