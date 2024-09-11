import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handshakeInstallProtocol, handshakeProtocol } from "@/data/handshakeProtocolDefinition";
interface Profile {
    name: string;
    bio: string;
    data: any | null;
    location: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: Profile = {
    name: "",
    data: null,
    bio: "",
    location: "",
    status: 'idle',
    error: null,
};

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async (data: { web5: any, did: string }, { rejectWithValue }) => {
        console.log("Thunk started executing");
        try {
            const response = await data.web5.dwn.records.query({
                message: {
                    filter: {
                        protocol: handshakeProtocol.protocol,
                        schema: handshakeProtocol.types.users.schema,
                        dataFormat: "application/json"

                    },
                },
            });
            if (response.status.code === 200) {
                const result = await Promise.all(
                    response.records.map(async (record: any) => {
                        const {data} = await record;
                        console.log('data.jsonnn', data.json());
                        return data.json();
                    })
                );
                console.log('result', result);
                return result;
            } else {
                console.log("error", response.status)
                return rejectWithValue("No profile found",);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state: any) => {
                state.name = "";
                state.bio = "";
                state.location = "";
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: any) => {
                state.name = action.payload.name;
                state.data = action.payload;
                console.log('action.payload', action.payload);
                state.bio = action.payload.bio;
                state.location = action.payload.location;
            }).addCase(fetchUserProfile.rejected, (state, action: any) => {
                state.error = action.error.message;
                state.data = null;
                console.log("Failed to fetch user profile data", action.error)
            })
    }
})

export default userProfileSlice.reducer;