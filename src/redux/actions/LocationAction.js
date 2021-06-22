/* eslint-disable prettier/prettier */
import * as actionTypes from '../action-types';
import { getMyLocations } from '@services/LocationService';
import { Strings } from '@res';
import { CancelToken } from 'axios';

/**
 * Set loading status
 * isLoading Boolean
 *
 * returns Object
 */
export function setLocationsLoadingState(isLoading) {
    return {
        type: actionTypes.MY_LOCATIONS_LOADING,
        isLoading,
    };
}


/**
 * Add My Stores
 * departments Array
 * hasMore Boolean
 * page Integer
 *
 * returns Object
 */
export function addMyLocations(items, hasMore, page) {
    return {
        type: actionTypes.ADD_MY_LOCATIONS,
        items,
        hasMore,
        page,
    };
}


/**
 * Set cancel token
 * token axios.CancelToken
 *
 * returns Object
 */
export function setLocationsCancelToken(token) {
    return {
        type: actionTypes.SET_MY_LOCATIONS_CANCEL_TOKEN,
        token,
    };
}

/**
 * Set if there is no more data
 *
 * returns Object
 */
export function hasNoMoreLocations() {
    return {
        type: actionTypes.MY_LOCATIONS_HAS_NO_MORE,
    };
}


/**
 * Get My Stores
 * reset Boolean
 *
 * return null
 */
export function getLocations(reset, lat, lon) {
    return async (dispatch, getState) => {
        if (reset) {
            let state = await getState();
            let request = state.locationData.cancelRequest;
            request.cancel(Strings.operation_canceled_by_user);
            const newRequestSource = CancelToken.source();
            await dispatch(setLocationsCancelToken(newRequestSource));
            await dispatch(addMyLocations([], true, 1));
        }

        await dispatch(setLocationsLoadingState(true));

        let { locationData } = await getState();
        let { page, limit, locations, cancelRequest } = locationData;
        const { data } = await getMyLocations(lat, lon, limit);
        if (Array.isArray(data.list) && data.list.length) {
            const mergedLocations = mergeData(locations, data.list);
            dispatch(addMyLocations(mergedLocations, true, page + 1));
        } else {
            dispatch(hasNoMoreLocations());
        }

        dispatch(setLocationsLoadingState(false));
    };
}


/**
 * Merge old data with new data, after checking if department id is not exist already
 * oldData Array
 * newData Array
 * return Array
 */
function mergeData(oldData, newData) {
    newData.forEach((newDataItem, newDataIndex) => {
        if (newDataItem.id) {
            let index = oldData.findIndex(data => (data.id && data.id === newDataItem.id));
            if (index === -1)
                {oldData.push(newDataItem);}
        }
    });
    return oldData;
}
