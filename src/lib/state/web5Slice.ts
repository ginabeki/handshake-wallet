import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Web5State {
    web5: any | null;
    did: string | null;
    isAuthenticated: boolean;
}

const initialState: Web5State = {
    web5: null,
    did: null,
    isAuthenticated: false,
}

const web5Slice = createSlice({
    name: 'web5',
    initialState,
    reducers: {
      setWeb5: (state, action: PayloadAction<any>) => {
        state.web5 = action.payload;
      },
      setDID: (state, action: PayloadAction<string>) => {
        state.did = action.payload;
      },
      setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
      },
    },
  });

export const {setWeb5, setDID, setIsAuthenticated} = web5Slice.actions;
export default web5Slice.reducer;