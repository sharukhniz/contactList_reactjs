import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContact = createAsyncThunk(
  "contacts/fetchContacts",
  async ({ page, limit, search }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/contacts?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContacts",
  async (contactData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/contacts",
        contactData
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export const updateContact = createAsyncThunk(
  "contacts/updateContacts",
  async (contactData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/contacts/${contactData.id}`,
        contactData
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContacts",
  async (contactData) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/contacts/${contactData.id}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    status: "idle",
    error: null,
    showDeleteModal: false,
    showAddModal: false,
    showUpdateModal: false,
    selectedContactId: null,
    page: 1,
    limit: 5,
    search: "",
  },
  reducers: {
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
    setSelectedContactId: (state, action) => {
      state.selectedContactId = action.payload;
    },
    setShowUpdateModal: (state, action) => {
      state.showUpdateModal = action.payload;
    },
    setPage:(state,action)=>{
      state.page=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload.contacts;
        state.pageCount = action.payload.pageCount;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.contacts.findIndex(
          (x) => x._id === action.payload._id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  setShowDeleteModal,
  setShowAddModal,
  setShowUpdateModal,
  setSelectedContactId,
  setPage
} = contactSlice.actions;

export default contactSlice.reducer;
