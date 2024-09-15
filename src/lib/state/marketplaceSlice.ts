import { handshakeProtocol } from './../../data/handshakeProtocolDefinition';
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit"

interface MarketPlaceItem {
    id: string;
    title: string;
    price: number;
    condition: 'new' | 'used';
    description: string;
    location: string;
    photos: string[];
    sellerId: string;
}

interface MarketPlaceState {
    items: MarketPlaceItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MarketPlaceState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchListings = createAsyncThunk(
  'marketplace/fetchListings',
  async (web5: any, { rejectWithValue }) => {
    if (!web5 || !web5.dwn || !web5.dwn.records) {
      return rejectWithValue("Web5 instance is not properly initialized");
    }
    
    try {
      const response = await web5.dwn.records.query({
        message: {
          filter: {
            protocolPath: "marketplaceItem",
            schema: handshakeProtocol.types.marketplaceItem.schema,
          },
        },
      });

      if (response.status.code !== 200) {
        throw new Error(`Failed to fetch listings: ${response.status.detail}`);
      }

      const items = await Promise.all(
        response.records.map(async (record: any) => {
          const data = await record.data.json();
          return { ...data, id: record.id };
        })
      );

      return items;
    } catch (error) {
      console.error('Error in fetchListings:', error);
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch listings");
    }
  }
);

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
  
  export default marketplaceSlice.reducer;