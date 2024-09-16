import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { handshakeProtocol } from "@/data/handshakeProtocolDefinition";

interface Message {
  from: string;
  to: string;
  itemId: string;
  message: string;
  timestamp: string;
}

interface MessageState {
  messages: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  status: 'idle',
  error: null,
};

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ web5, did, itemId, sellerId, message }: any, { rejectWithValue }) => {
      try {
        // console.log('Sending message:', { did, itemId, sellerId, message });
        const { record } = await web5.dwn.records.create({
          data: {
            from: did,
            to: sellerId,
            itemId,
            message,
            timestamp: new Date().toISOString(),
          },
          message: {
            protocol: handshakeProtocol.protocol,
            protocolPath: "marketplace/marketplaceMessage",
            schema: handshakeProtocol.types.marketplaceMessage.schema,
            dataFormat: "application/json",
          },
        });
  
        // console.log('Record created:', record);
  
        if (record && typeof record.send === 'function') {
          try {
            await record.send(sellerId);
            // console.log('Message sent to seller');
          } catch (sendError) {
            console.error('Error sending record to seller:', sendError);
          }
        } else {
          console.warn('Record send method not available, skipping send to seller');
        }
  
        const sentMessage = { from: did, to: sellerId, itemId, message, timestamp: new Date().toISOString() };
        // console.log('Message sent successfully:', sentMessage);
        return sentMessage;
      } catch (error: any) {
        console.error('Error in sendMessage thunk:', error);
        return rejectWithValue(error.toString());
      }
    }
  );

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ web5, did, itemId }: any, { rejectWithValue }) => {
    try {
      const response = await web5.dwn.records.query({
        message: {
          filter: {
            protocol: handshakeProtocol.protocol,
            protocolPath: "marketplace/marketplaceMessage",
            schema: handshakeProtocol.types.marketplaceMessage.schema,
          },
        },
      });

      const messages = await Promise.all(
        response.records.map(async (record: any) => {
          const data = await record.data.json();
          return data;
        })
      );

      return messages.filter((msg: any) => msg.itemId === itemId);
    } catch (error:any) {
      return rejectWithValue(error.toString());
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    resetMessageStatus: (state) => {
        state.status = 'idle';
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state:any, action) => {
        state.messages.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(sendMessage.rejected, (state, action:any) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action:any) => {
        state.messages = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMessages.rejected, (state, action:any) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetMessageStatus } = messageSlice.actions;
export default messageSlice.reducer;