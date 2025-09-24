import { configureStore } from "@reduxjs/toolkit";
import taskReducer  from "../store/taskSlice";

const stores = configureStore({
    reducer : {
        task : taskReducer
    },
    devTools : true

});

export default stores;
export type RootState = ReturnType<typeof stores.getState>;
