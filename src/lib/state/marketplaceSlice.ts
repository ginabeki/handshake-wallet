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

export const createListing = createAsyncThunk(
    'marketplace/createListing',
    async (data: { web5: any; did: string; item: Omit<MarketPlaceItem, 'id' | 'sellerId'> }, { rejectWithValue }) => {
      try {
        const result = await data.web5.dwn.records.create({
          data: { ...data.item, sellerId: data.did },
          message: {
            protocol: handshakeProtocol.protocol,
            protocolPath: "marketplaceItem",
            schema: handshakeProtocol.types.marketplaceItem.schema,
            dataFormat: "application/json"
          }
        });
  
        console.log('Create record result:', result);
  
        if (!result.record) {
          throw new Error('Failed to create record: ' + JSON.stringify(result));
        }
  
        const createdItem = await result.record.data.json();
        return { ...createdItem, id: result.record.id };
      } catch (error) {
        console.error('Error in createListing:', error);
        return rejectWithValue(error instanceof Error ? error.message : "Failed to create listing");
      }
    }
  );

  export const fetchListings = createAsyncThunk(
    'marketplace/fetchListings',
    async (data: { web5: any; did: string }, { rejectWithValue }) => {
      try {
        const { records } = await data.web5.dwn.records.query({
          message: {
            filter: {
              protocol: handshakeProtocol.protocol,
              protocolPath: "marketplaceItem",
              schema: handshakeProtocol.types.marketplaceItem.schema,
            },
          },
        });
  
        const items = await Promise.all(records.map(async (record: any) => {
          const item = await record.data.json();
          return { ...item, id: record.id };
        }));
  
        return items;
      } catch (error) {
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
        .addCase(createListing.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createListing.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items.push(action.payload);
          })
          .addCase(createListing.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })
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