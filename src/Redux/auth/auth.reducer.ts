import { decodedTokenDto } from "@/utils/dto/decodedToken";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  data: decodedTokenDto | null;
}

const initialState: AuthState = {
  data: null,
};

export const Auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    datafetched: (state, action: PayloadAction<decodedTokenDto | null>) => {
      state.data = action.payload;
    },
  },
});

export const { datafetched } = Auth.actions;

// Define the type of state for use in selectors
interface RootState {
  Auth: AuthState;
}

export const selectCompanionsData = (state: RootState) => state.Auth.data;

export default Auth.reducer;
