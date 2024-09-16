import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

interface Pfis {
  offerings: any;
  loading: boolean;
  error: any;
  status: string;
  selectedCredentials: any;
  selectedPfi: any;
  rfq: any;
  order: any;
}

const initialState: Pfis = {
  offerings: {},
  loading: false,
  error: null,
  status: "idle",
  selectedCredentials: null,
  selectedPfi: null,
  rfq: null,
  order: null,
};

export const getOfferings = createAsyncThunk(
  "pfis/getOfferings",
  async (pfisList: any, { rejectWithValue }) => {
    const { TbdexHttpClient } = await import("@tbdex/http-client");
    try {
      const allAfferings = await Promise.all(
        pfisList.map(async (pfi: any) => {
          const offers = await TbdexHttpClient.getOfferings({
            pfiDid: pfi.did,
          });

          const offerings = JSON.parse(JSON.stringify(offers));

          return {
            pfiName: pfi.name,
            pfiDid: pfi.did,
            offerings,
          };
        })
      );

      return allAfferings;
    } catch (error: any) {
      console.error("Error fetching offerings:", error);
      return rejectWithValue(error.message || "Error fetching offerings");
    }
  }
);

const pfisSlice = createSlice({
  name: "pfis",
  initialState,
  reducers: {
    setSelectedCredentials: (state, action) => {
      state.selectedCredentials = action.payload;
    },

    setSelectedPfi: (state, action) => {
      state.selectedPfi = action.payload;
    },

    setRfq: (state, action) => {
      state.rfq = action.payload;
    },

    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add the getOfferings reducer
    builder
      .addCase(getOfferings.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getOfferings.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.offerings = action.payload;
      })
      .addCase(getOfferings.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCredentials, setSelectedPfi, setRfq, setOrder } =
  pfisSlice.actions;

export default pfisSlice.reducer;
