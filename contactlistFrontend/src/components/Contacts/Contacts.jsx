import React, { useEffect, useState } from "react";
import Style from "./Contacts.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getContact,
  deleteContact,
  setSelectedContactId,
  updateContact,
  setPage,
} from "../../redux/ContactSlice";
import DeleteModal from "../Modals/DeleteModal";
import AddModal from "../Modals/AddModal";
import EditModal from "../Modals/EditModal";
import "./Contacts.css";

const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, pageCount, limit, search,page } = useSelector(
    (state) => state.contacts
  );

  const selectedContactId = useSelector(
    (state) => state.contacts.selectedContactId
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getContact({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  // ---**Pagination***---

  // const handlePageClick = ({ selected }) => {
  //   setCurrentPage(selected + 1);
  // };

  const handlePaginate = (newPage) => {
    dispatch(setPage(newPage));
  };
  // ---***Delete***---

  const handleDelete = async (id) => {
    await dispatch(setSelectedContactId(id));
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteContact({ id: selectedContactId }));
      if (page === pageCount && contacts.length === 1) {
        dispatch(setPage(pageCount - 1));
      }
      dispatch(getContact({ page, limit, search }));
      setShowDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    dispatch(setSelectedContactId(null));
  };

  // ---***Update***---

  const handleUpdate = (id) => {
    dispatch(setSelectedContactId(id));
    setShowEditModal(true);
  };

  const handleConfirmUpdate = (id, firstName, lastName, email, phone) => {
    try {
      dispatch(updateContact({ id, firstName, lastName, email, phone }));
      dispatch(getContact());
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCloseModal = () => {
    setShowEditModal(false);
    dispatch(setSelectedContactId(null));
  };

  const startIndex = (page - 1) * limit + 1;

  return (
    <div className={Style.container}>
      <table className="table">
        <thead>
          <tr>
            <th>Sl</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{index + startIndex}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td className={Style.tdButton}>
                <Button
                  onClick={() => handleUpdate(contact._id)}
                  variant="outline-success"
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(contact._id)}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination handlePageClick={handlePageClick} pageCount={pageCount} /> */}
      <Pagination handlePaginate={handlePaginate} currentPage={page} totalPages={pageCount} />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleCloseModal={handleCloseModal}
        handleConfirmDelete={handleConfirmDelete}
      />
      <AddModal />
      <EditModal
        showUpdateModal={showEditModal}
        handleEditCloseModal={handleEditCloseModal}
        handleConfirmUpdate={handleConfirmUpdate}
        contactId={selectedContactId}
      />
    </div>
  );
};

export default Contacts;
