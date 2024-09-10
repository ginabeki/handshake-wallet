import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Web5 } from "@web5/api";
interface Web5State {
    web5: any | null;
    did: string | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'failed' | 'succeeded';
    error: any | null;
}

const initialState: Web5State = {
    web5: null,
    did: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
}

export const initializeWeb5 = createAsyncThunk (
    'auth/initializeweb5',
    async ({rejectWithValue}: any) => 
       {
        try {
            const {web5, did} = await Web5.connect();
            return { web5, did};
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to initialize web5');
        }
       }
);

const web5Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    //   setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
    //     state.isAuthenticated = action.payload;
    //   },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeWeb5.pending, (state) => {
            state.status = 'loading';
        }).addCase(initializeWeb5.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.web5 = action.payload.web5;
            state.did = action.payload.did;
            state.isAuthenticated = true;
            state.error = null;
        }).addCase(initializeWeb5.rejected, (state, action : any) => {
            state.status = 'failed';
            state.error = action.payload?.message || action.error.message;
        });
    }
  });

export default web5Slice.reducer;