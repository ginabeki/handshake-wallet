import { handshakeInstallProtocol } from "@/data/handshakeProtocolDefinition";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { constantPublicDid as publicDid } from "@/data/constant";

interface Web5StateInitialStateProps {
  did: string | null;
  publicDid: string | null;
  isAuthenticated: boolean;
  status: string;
  error: string | null;
  loading: boolean;
  web5: any | null;
}

const initialState: Web5StateInitialStateProps = {
  did: null,
  publicDid: publicDid as string,
  isAuthenticated: false,
  status: "idle",
  error: null,
  loading: false,
  web5: null,
};
console.log('constantPublicDid', publicDid);

const createPublicDid = async (web5: any) => {
  if (publicDid) {
    return publicDid;
  }
  const { did: newPublicDid } = await web5.did.create('key');
  localStorage.setItem('publicDid', newPublicDid);
  return newPublicDid;
};

export const initializeWeb5 = createAsyncThunk<
  { web5: any; did: string; publicDid: string },
  void,
  { rejectValue: string }
>("auth/initializeweb5", async (_, { rejectWithValue }) => {
  try {
    const { Web5 } = await import("@web5/api");
    const { web5, did } = await Web5.connect();

    let usedPublicDid = publicDid || localStorage.getItem('publicDid');
    if (!usedPublicDid) {
      usedPublicDid = await createPublicDid(web5);
    }

    if (!usedPublicDid) {
      throw new Error("Failed to create or retrieve public DID");
    }

    return { web5, did, publicDid: usedPublicDid };
  } catch (error: any) {
    console.error("Failed to initialize Web5:", error);
    return rejectWithValue(error.message || "Failed to initialize Web5");
  }
});

const web5Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutWeb5: (state) => {
      state.did = null;
      state.publicDid = null;
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
      .addCase(initializeWeb5.fulfilled, (state, action) => {
        const { did, web5, publicDid } = action.payload;
        state.web5 = web5;
        state.status = "succeeded";
        state.did = did;
        state.publicDid = publicDid;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        if (web5 && did) {
          handshakeInstallProtocol(web5, did);
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