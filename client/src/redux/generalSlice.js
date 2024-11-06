import { createSlice } from "@reduxjs/toolkit";
const generalSlice = createSlice({
  name: "general",
  initialState: {
    selectedCategories: [],
    dateFilters: {
      fromDate: "",
      toDate: "",
    },
  },
  reducers: {
    selectState: (state, { payload }) => {
        console.log("Payload received in selectState:", payload);
        
        return {
          ...state,
          selectedCategories: payload.selectedCategories,
          dateFilters: {
            fromDate: payload.dateFilters.fromDate,
            toDate: payload.dateFilters.toDate,
          },
        };
  },
}});

export const { selectState } = generalSlice.actions;
export const reducers = {
  generalSlice: generalSlice.reducer,
};
