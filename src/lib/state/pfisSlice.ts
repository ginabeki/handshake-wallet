import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { TbdexHttpClient } from "@tbdex/http-client";

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

// export const getOfferings = createAsyncThunk(
//   "pfis/getOfferings",
//   async (pfiDid: string, { rejectWithValue }) => {
//     const { TbdexHttpClient } = await import("@tbdex/http-client");
//     try {
//       const offerings = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
//       console.log("Offerings:", offerings);
//       return offerings;
//     } catch (error: any) {
//       console.error("Error fetching offerings:", error);
//       return rejectWithValue(error.message || "Error fetching offerings");
//     }
//   }
// );

export const getOfferings = createAsyncThunk(
  "pfis/getOfferings",
  async (pfisDid: any, { rejectWithValue }) => {
    const { TbdexHttpClient } = await import("@tbdex/http-client");
    try {
      //   const offerings = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });

      const allAfferings = await Promise.all(
        pfisDid.map(async (pfi: any) => {
          return await TbdexHttpClient.getOfferings({ pfiDid: pfi.did });
        })
      );

      console.log("Offerings:", allAfferings);
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
