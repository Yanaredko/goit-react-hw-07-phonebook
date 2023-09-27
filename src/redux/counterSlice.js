import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  try {
    const response = await axios.get("https://651418d58e505cebc2eab408.mockapi.io/hw-07/contacts");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (newContact) => {
  try {
    const response = await axios.post("https://651418d58e505cebc2eab408.mockapi.io/hw-07/contacts", newContact);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId) => {
  try {
    await axios.delete(`https://651418d58e505cebc2eab408.mockapi.io/hw-07/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    throw error;
  }
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;