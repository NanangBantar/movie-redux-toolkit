import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { apikey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('fetch/fetchAsyncMovies', async () => {
    const movieText = "Harry";
    const resp = await movieApi.get(`?apikey=${apikey}&s=${movieText}&type=movie`)
        .catch(err => console.log(err));
    return resp.data;
});

export const fetchAsyncShows = createAsyncThunk('fetch/fetchAsyncShows', async () => {
    const seriesText = "Friends";
    const resp = await movieApi.get(`?apikey=${apikey}&s=${seriesText}&type=series`)
        .catch(err => console.log(err));
    return resp.data;
});

export const fetchAsyncShowOrMovieDetails = createAsyncThunk('fetch/fetchAsyncShowOrMovieDetails',
    async (id) => {
        const resp = await movieApi.get(
            `?apikey=${apikey}&i=${id}&Plot=full`)
            .catch(err => console.log(err));
        return resp.data;
    });


const initialState = {
    movies: {},
    shows: {},
    selectedShowOrMovie: {}
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedShowOrMovie: (state) => {
            state.selectedShowOrMovie = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("success");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("success");
            return { ...state, shows: payload };
        },
        [fetchAsyncShowOrMovieDetails.fulfilled]: (state, { payload }) => {
            console.log("success");
            return { ...state, selectedShowOrMovie: payload };
        },
    }
});

export const { removeSelectedShowOrMovie } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedShowOrMovie = (state) => state.movies.selectedShowOrMovie;
export default movieSlice.reducer;