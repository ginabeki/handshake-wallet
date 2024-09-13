import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Pfis {
  offerings: any;
  loading: boolean;
  error: any;
  status: string;
}

const initialState: Pfis = {
  offerings: {},
  loading: false,
  error: null,
  status: "idle",
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
      console.log("allAfferings", allAfferings);
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOfferings.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(getOfferings.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "success";
      state.offerings = action.payload;
    });
    builder.addCase(getOfferings.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default pfisSlice.reducer;
