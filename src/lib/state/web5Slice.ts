import { handshakeInstallProtocol } from "@/data/handshakeProtocolDefinition";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { constantPublicDid as publicDid } from "@/data/constant";

interface Web5StateInitialStateProps {
  did: string | null;
  isAuthenticated: boolean;
  status: string;
  error: string | null;
  loading: boolean;
  web5: any[] | null;
  customerDid: any;
}

const initialState: Web5StateInitialStateProps = {
  did: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  loading: false,
  web5: null,
  customerDid: null,
};

if (publicDid) {
  if (typeof window !== "undefined") {
    localStorage.setItem("publicDid", publicDid);
  }
} else {
  console.error("publicDid is undefined");
}
console.log("constantPublicDid", publicDid);

export const initializeWeb5 = createAsyncThunk<
  { web5: any; did: string },
  void,
  { rejectValue: string }
>("auth/initializeweb5", async (_, { rejectWithValue }) => {
  try {
    const { Web5 } = await import("@web5/api");
    const { DidDht } = await import("@web5/dids");
    const { web5 } = await Web5.connect();

    const customerDid = await DidDht.create({
      options: {
        publish: true,
      },
    });

    return { web5, did: customerDid.uri, customerDid };
  } catch (error: any) {
    console.error("Failed to initialize Web5:", error);
    return rejectWithValue(error.message || "Failed to initialize Web5");
  }
});

const web5Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutWeb5: (state: any) => {
      state.did = null;
      state.customerDid = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.web5 = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeWeb5.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(initializeWeb5.fulfilled, (state, action: any) => {
        const { web5, did, customerDid } = action.payload;
        state.web5 = web5;
        state.status = "succeeded";
        state.did = did;
        state.customerDid = customerDid;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        console.log("Web5 initialized successfully:", web5.connectedDid);
        if (web5 && did) {
          handshakeInstallProtocol(web5, web5.connectedDid);
        }
      })
      .addCase(initializeWeb5.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
        state.web5 = null;
      });
  },
});

export const { logoutWeb5 } = web5Slice.actions;
export default web5Slice.reducer;
