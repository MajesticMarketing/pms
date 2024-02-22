import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState:{
        project: null,
        activities: null,
        chartData: [],
        isMemberOfThisProject: false,
        isCreatedByUser: false,
    },
    reducers:{
        addProductRequest: (state) =>{
            state.loading=true;
        },
        addProductSuccess:(state,action)=>{
            state.loading = false;
            return action.payload;  //add the new product to the list of products in the store
        },
        addProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          viewProductRequest: (state) => {
            state.loading = true;
          },
          viewProductSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
          },
          viewProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
        }
});