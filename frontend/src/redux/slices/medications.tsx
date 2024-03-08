import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IMedication {
  _id: string;
  price: number;
  isFavorite: boolean;
}

export interface IMedicationsState {
  medications: {
    items: IMedication[];
    originalItems: IMedication[];
    status: 'loading' | 'loaded' | 'error';
  };
}

export const fetchMedications = createAsyncThunk<IMedication[], string>('medications/fetchMedications', async (storeId) => {
  const res = await axios.get(`/medications/${storeId}`);
  
  return res.data;
});

interface ToggleFavoriteMedPayload {
  medId: string;
  isFavorite: boolean;
}

export const toggleFavoriteMed = createAsyncThunk<string, ToggleFavoriteMedPayload>('medications/toggleFavoriteMed', async ({ medId, isFavorite }) => {
  try {
    await axios.patch(`/medications/${medId}`, { isFavorite });

    return medId;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
});

const initialState: IMedicationsState = {
  medications: {
    items: [],
    originalItems: [],
    status: 'loading',
  }
};

const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    sortByPrice(state, action: PayloadAction<'lowToHigh' | 'highToLow' | 'reset'>) {
      if (action.payload === 'lowToHigh') {
        state.medications.items.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) {
            return a.price - b.price;
          } else {
            return a.isFavorite ? -1 : 1;
          }
        });
      }
    
      if (action.payload === 'highToLow') {
        state.medications.items.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) {
            return b.price - a.price;
          } else {
            return a.isFavorite ? -1 : 1;
          }
        });
      }

      if (action.payload === 'reset') {
        state.medications.items = state.medications.originalItems;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedications.pending, (state) => {
        state.medications.originalItems = [];
        state.medications.items = [];
        state.medications.status = 'loading';
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.medications.originalItems = action.payload;
        state.medications.items = action.payload;
        state.medications.status = 'loaded';
      })
      .addCase(fetchMedications.rejected, (state) => {
        state.medications.originalItems = [];
        state.medications.items = [];
        state.medications.status = 'error';
      })
      .addCase(toggleFavoriteMed.fulfilled, (state, action) => {
        const medId = action.payload;
        const foundMed = state.medications.items.find(el => el._id === medId);

        if (foundMed) {
          const idx = state.medications.items.findIndex(el => el._id === medId);
          const updatedItem = {
            ...foundMed,
            isFavorite: !foundMed.isFavorite,
          };
        
          state.medications.items.splice(idx, 1, updatedItem);
        }
      })
      .addCase(toggleFavoriteMed.rejected, (state, action) => {
        console.error('Error toggling favorite:', action.error.message);
      });
  },
});

export const { sortByPrice } = medicationsSlice.actions;
export const medicationsReducer = medicationsSlice.reducer;
