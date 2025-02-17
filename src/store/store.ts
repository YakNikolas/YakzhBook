import { configureStore } from "@reduxjs/toolkit";

import bookStoreReducer from '../slice/bookStore'

const rootReducer = {
    bookStore: bookStoreReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;