import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Profile {
    name: string;
    bio: string;
    location: string;
}

const initialState: Profile = {
    name: "",
    bio: "",
    location: "",
}
