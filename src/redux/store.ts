import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";
import auth from "./features/auth/authSlice";
import filter from "./features/filter/filterSlice";

export const createStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined
) => {
    return configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            auth,
            filter
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        ...options,
    });
};

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

