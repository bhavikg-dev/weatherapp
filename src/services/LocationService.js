/* eslint-disable prettier/prettier */
import { hasSuccess, hasError } from '@services/ApiHelper';
import { appClient } from '@services/NetworkService';
import axios from 'axios';
const config = require('@config/api.json');

/**
 * getMyLocations
 * @param {string} lat
 * @param {string} lon
 * @param {number} cnt
 * @description Get My Locations
 */
export async function getMyLocations(lat, lon, limit) {
  const params = 'lat=' + lat + '&lon=' + lon + '&units=metric&&cnt=' + limit;
  try {
    const url = config.locations.getLocations + '&' + params;
    const response = await appClient.get(url);
    return hasSuccess(response.data);
  } catch (error) {
    /* istanbul ignore next */
    if (!axios.isCancel(error)) {
      return hasError(error);
    }
  }
}

export async function getMyLocation(locationId) {
  const params = 'id=' + locationId;
  try {
    const url = config.locations.getLocation + '&units=metric&' + params;
    const response = await appClient.get(url);
    return hasSuccess(response.data);
  } catch (error) {
    /* istanbul ignore next */
    if (!axios.isCancel(error)) {
      return hasError(error);
    }
  }
}

export async function getMyCurrentWeather(lat, lon) {
  const params = 'lat=' + lat + '&lon=' + lon;
  try {
    const url = config.locations.getMyLocation + '&units=metric&' + params;
    const response = await appClient.get(url);
    return hasSuccess(response.data);
  } catch (error) {
    /* istanbul ignore next */
    if (!axios.isCancel(error)) {
      return hasError(error);
    }
  }
}
