// redux filter

import { FilterState } from "@/interfaces/filter.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialFilterState: FilterState = {
    date: new Date(),
    sports: [],
    venues: [],
    faculty: [],
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setDate: (state, action: PayloadAction<Date>) => {
            state.date = action.payload;
        },
        setSports: (state, action: PayloadAction<string>) => {
            state.sports = addOrRemove(state.sports, action.payload);
        },
        setVenues: (state, action: PayloadAction<string>) => {
            state.venues = addOrRemove(state.venues, action.payload);
        },
        setFaculty: (state, action: PayloadAction<string>) => {
            state.faculty = addOrRemove(state.faculty, action.payload);
        },
        setDefault: (state, action: PayloadAction<Omit<FilterState, "date">>) => {
            state.sports = action.payload.sports;
            state.venues = action.payload.venues;
        }
    }
})

function addOrRemove<T>(array: T[], value: T): T[] {
    if (array.includes(value)) {
        return array.filter(item => item !== value);
    } else {
        return [...array, value];
    }
}

export const { setDate, setSports, setVenues, setFaculty, setDefault } = filterSlice.actions;
export default filterSlice.reducer;
