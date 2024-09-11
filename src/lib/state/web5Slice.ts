import { handshakeInstallProtocol } from "@/data/handshakeProtocolDefinition";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Web5StateInitialStateProps {
  did: null;
  isAuthenticated: boolean;
  status: string;
  error: null;
  loading: boolean;
  web5: any[] | null;
}

const initialState: Web5StateInitialStateProps = {
  did: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  loading: false,
  web5: null,
};

export const initializeWeb5 = createAsyncThunk<
  { did: string },
  void,
  { rejectValue: string }
>("auth/initializeweb5", async (_, { rejectWithValue }) => {
  try {
    // console.log("Initializing Web5...");
    const { Web5 } = await import("@web5/api");
    const { web5, did } = await Web5.connect();
    // console.log("Web5 instance:", web5);

    // Store the Web5 instance in the variable
    // console.log("Web5 initialized successfully. DID:", did);
    return { web5, did };
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
      state.isAuthenticated = false;
      state.status = "idle";
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
        const Did = action.payload.did;
        state.status = "succeeded";
        state.did = Did;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        if (Did) {
          handshakeInstallProtocol(action.payload.web5, Did);
          //   console.log("waiting for payload");
        }
        // console.log("action-payloooad", action.payload.web5);
      })
      .addCase(initializeWeb5.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
      });
  },
});

export const { logoutWeb5 } = web5Slice.actions;
export default web5Slice.reducer;
