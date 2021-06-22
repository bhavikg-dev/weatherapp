/* eslint-disable prettier/prettier */
import * as actionTypes from '../action-types';
import { CancelToken } from 'axios';

const initialState = {
    locations: [],
    hasMore: true,
    page: 0,
    limit: 20,
    isLoading: false,
    isRefreshing: false,
    lat: '',
    lon: '',
    cancelRequest: CancelToken.source(),
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_MY_LOCATIONS:
            return {
                ...state,
                locations: action.items,
                hasMore: action.hasMore,
                page: action.page,
            };

        case actionTypes.MY_LOCATIONS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case actionTypes.SET_MY_LOCATIONS_CANCEL_TOKEN:
            return {
                ...state,
                cancelRequest: action.token,
            };

        case actionTypes.MY_LOCATIONS_HAS_NO_MORE:
            return {
                ...state,
                hasMore: false,
            };

        default:
            return state;
    }
}
