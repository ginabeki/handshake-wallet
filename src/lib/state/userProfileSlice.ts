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

export const createUserProfile = createAsyncThunk(
    'userProfile/createUserProfile',
    async (data: { web5: any, did: string, profile: Omit<Profile, 'status' | 'error' | 'data'> }, { rejectWithValue }) => {
        console.log("Creating user profile...");
        try {
            const { record } = await data.web5.dwn.records.create({
                data: data.profile,
                message: {
                    protocol: handshakeProtocol.protocol,
                    protocolPath: "users",
                    schema: handshakeProtocol.types.users.schema,
                    dataFormat: "application/json"
                }
            });

            const createdProfile = await record.data.json();
            console.log('Created profile:', createdProfile);
            return createdProfile;
        } catch (error) {
            console.error("Error creating profile:", error);
            return rejectWithValue(error instanceof Error ? error.message : "Failed to create profile");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'userProfile/updateUserProfile',
    async (data: { web5: any, did: string, profile: Partial<Omit<Profile, 'status' | 'error' | 'data'>> }, { rejectWithValue }) => {
        console.log("Updating user profile...");
        try {
            const { records } = await data.web5.dwn.records.query({
                message: {
                    filter: {
                        protocol: handshakeProtocol.protocol,
                        protocolPath: "users",
                        schema: handshakeProtocol.types.users.schema,
                    },
                },
            });

            console.log("Query results:", records);

            if (records.length === 0) {
                throw new Error("No profile found to update");
            }

            const existingRecord = records[0];
            console.log("Existing record:", existingRecord);

            let existingData = await existingRecord.data.json();
            console.log("Existing data:", existingData);

            // Update the existing data with the new profile data
            existingData = { ...existingData, ...data.profile };
            console.log("Updated data:", existingData);

            const response = await existingRecord.update({
                data: existingData
            });

            console.log("Update response:", response);

            if (response.status.code === 202) {
                // Obtain the updated record
                const { record: updatedRecord } = await data.web5.dwn.records.read({
                    message: {
                        filter: {
                            recordId: existingRecord.id
                        }
                    },
                });

                const updatedProfile = await updatedRecord.data.json();
                console.log('Updated profile:', updatedProfile);
                return updatedProfile;
            } else {
                throw new Error(`Error updating profile: ${response.status.code}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            return rejectWithValue(error instanceof Error ? error.message : "Failed to update profile");
        }
    }
);

export const deleteUserProfile = createAsyncThunk(
    'userProfile/deleteUserProfile',
    async (data: { web5: any, did: string }, { rejectWithValue }) => {
        console.log("Deleting user profile...");
        try {
            const { records } = await data.web5.dwn.records.query({
                message: {
                    filter: {
                        protocol: handshakeProtocol.protocol,
                        protocolPath: "users",
                        schema: handshakeProtocol.types.users.schema,
                    },
                },
            });

            if (records.length === 0) {
                throw new Error("No profile found to delete");
            }

            const existingRecord = records[0];
            const profileData = await existingRecord.data.json();
            const profileName = profileData.name;

            const response = await data.web5.dwn.records.delete({
                message: {
                    recordId: existingRecord.id,
                }
            });

            if (response.status.code === 202) {
                console.log(`Deleted profile for ${profileName}. Status: ${response.status.code}`);
                return { success: true, message: `Profile for ${profileName} deleted successfully` };
            } else {
                throw new Error(`Failed to delete profile. Status: ${response.status.code}`);
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            return rejectWithValue(error instanceof Error ? error.message : "Failed to delete profile");
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
            }).addCase(createUserProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.name = action.payload.name;
                state.bio = action.payload.bio;
                state.location = action.payload.location;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(createUserProfile.rejected, (state, action:any) => {
                state.status = 'failed';
                state.error = action.payload;
                state.data = null;
            }).addCase(updateUserProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.name = action.payload.name;
                state.bio = action.payload.bio;
                state.location = action.payload.location;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action:any) => {
                state.status = 'failed';
                state.error = action.payload;
            }).addCase(deleteUserProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.name = "";
                state.bio = "";
                state.location = "";
                state.data = null;
                state.error = null;
            })
            .addCase(deleteUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });;
    }
})

export default userProfileSlice.reducer;