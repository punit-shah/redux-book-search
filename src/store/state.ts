import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface BookSearchState {
  query: string;
  page: number;
}

const initialState: BookSearchState = {
  query: '',
  page: 1,
};

const bookSearchState = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },

    nextPage: (state) => {
      state.page += 1;
    },

    previousPage: (state) => {
      state.page -= 1;
    },
  },
});
export default bookSearchState;

export const { search, nextPage, previousPage } = bookSearchState.actions;

export const selectQuery = (state: RootState) => state.bookSearch.query;
export const selectPage = (state: RootState) => state.bookSearch.page;
