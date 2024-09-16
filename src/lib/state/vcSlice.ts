// src/slices/customerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface VcJwt {
  jwt: string;
  loading: boolean;
  error: string | null;
  status: string;
}

const initialState: VcJwt = {
  jwt: "",
  loading: false,
  error: null,
  status: "idle",
};

export const getVcJwt = createAsyncThunk(
  "kcc/knownCustomerCredential",

  async ({ customerName, countryCode, customerDID }: any) => {
    const response = await axios.get("https://mock-idv.tbddev.org/kcc", {
      params: {
        name: customerName,
        country: countryCode,
        did: customerDID,
      },
    });
    // console.log(response.data);
    return response.data;
  }
);

const vcSlice = createSlice({
  name: "kcc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVcJwt.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getVcJwt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.jwt = action.payload;
      })
      .addCase(getVcJwt.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vcSlice.reducer;
