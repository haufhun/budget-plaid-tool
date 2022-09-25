import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Not Provided",
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setName: (state, action) => {
      const name = action.payload;
      state.name = name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = testSlice.actions;

export default testSlice.reducer;
