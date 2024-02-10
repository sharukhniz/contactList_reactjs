import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact } from "../../redux/ContactSlice";
import { Button, Modal } from "react-bootstrap";

const EditContactModal = ({
  showUpdateModal,
  handleEditCloseModal,
  handleConfirmUpdate,
  contactId,
}) => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contactId) {
      const contact = contacts.find((c) => c._id === contactId);
      if (contact) {
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.email);
        setPhone(contact.phone);
      }
    }
  }, [contactId, contacts]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(getContact());
    handleConfirmUpdate(contactId, firstName, lastName, email, phone);
    handleEditCloseModal();
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleEditCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="form_group">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="exampleInputPassword1">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditContactModal;
