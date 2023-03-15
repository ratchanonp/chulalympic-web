// redux filter

import { FilterState, SetValue } from "@/interfaces/filter.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// new UTC date without time
const todayWithoutTime = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

const initialFilterState: FilterState = {
    date: todayWithoutTime,
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
        setValue: (state, action: PayloadAction<SetValue>) => {
            const { name, value } = action.payload;

            switch (name) {
                case 'date':
                    state.date = value as Date;
                    break;
                case 'sports':
                    state.sports = value as string[];
                    break;
                case 'venues':
                    state.venues = value as string[];
                    break;
                case 'faculty':
                    state.faculty = value as string[];
                    break;
                default:
                    break;
            }
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

export const { setDate, setSports, setVenues, setFaculty, setDefault, setValue } = filterSlice.actions;
export default filterSlice.reducer;
