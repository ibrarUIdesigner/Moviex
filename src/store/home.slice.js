import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	url: { name: 'new url' },
	generes: {},
};

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		getAPIConfiguration: (state, action) => {
			state.url = action.payload;
		},
		getGenres: (state, action) => {
			state.generes = action.payload;
		},
	},
});

export const { getAPIConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
