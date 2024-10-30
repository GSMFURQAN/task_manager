import{createSlice} from "@reduxjs/toolkit"
const generalSlice = createSlice({
    name:'general',
    initialState:{
        selectedCategories:[],
    },
    reducers:{
        selectState:(state,payload)=>({
            ...state , 
            selectedCategories :  payload.payload.selectedCategories}
)}
})

export const{selectState} = generalSlice.actions;
export const reducers={
    generalSlice: generalSlice.reducer
}