import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
  isDiscountActive: boolean;
}

const initialState: TimerState = {
  isDiscountActive: true,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setDiscountActive: (state, action) => {
      state.isDiscountActive = action.payload;
    },
  },
});

export const { setDiscountActive } = timerSlice.actions;
export default timerSlice.reducer;
