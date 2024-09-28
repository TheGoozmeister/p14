import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from "./employees/employeesSlice";


export const store = configureStore({
    reducer: {
        employees: employeesReducer,
    },
});


export default store;

