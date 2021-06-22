/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Strings, Colors, Fonts } from '@res';
import { moderateScale } from '@utils/utils';
import { useDispatch } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Navigation } from 'react-native-navigation';
import { getMyLocation } from '@services/LocationService';

function Location(props) {
    const _map = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState({});
    const selectedLocationId = props?.data?.locationId;
    const [region, setRegion] = useState({
        latitude: props?.data?.lat,
        longitude: props?.data?.lon,
        latitudeDelta: 1,
        longitudeDelta: 1,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        async function getUserLocation() {
            const { data } = await getMyLocation(selectedLocationId);
            if (data?.id) {
                setSelectedLocation(data);
            }
        }
        getUserLocation();
    }, [dispatch, selectedLocationId]);

    useEffect(()=> {
        const listener = Navigation.events().registerNavigationButtonPressedListener(
            ({buttonId}) => {
                if (buttonId === 'backButton') {
                    Navigation.pop(props.componentId);
                }
              }
            );
        return () => listener.remove();
    }, []);

    const locationsView = () => {
        return (<View style={styles.locationsView}>
            <View style={styles.locInfo}>
                <Text style={styles.cityName}>{selectedLocation?.name}</Text>
                <Text style={styles.cityWeather}>{selectedLocation?.weather?.[0].main}</Text>
                <Text style={styles.weatherParams}>{Strings.humidity} : {selectedLocation?.main?.humidity}</Text>
                <Text style={styles.weatherParams}>{Strings.windSpeed} : {selectedLocation?.wind?.speed}</Text>
                <Text style={styles.weatherParams}>{Strings.maxTemp} : {selectedLocation?.main?.temp_max}°c</Text>
                <Text style={styles.weatherParams}>{Strings.minTemp} : {selectedLocation?.main?.temp_min}°c</Text>
            </View>
            <View style={styles.locTemp}>
                <Text style={styles.weatherTemp}>{selectedLocation?.main?.temp}°c</Text>
            </View>
        </View>);
    };

    return (<View style={styles.baseContainer}>
        {selectedLocation.id !== '' && region?.latitude !== '' && region?.longitude !== '' && <MapView
            ref={_map}
            provider={PROVIDER_GOOGLE}
            style={styles.mapsView}
            region={region}
            onRegionChangeComplete={newRegion => setRegion(newRegion)}
        >
        <Marker coordinate={{ latitude: region?.latitude, longitude: region?.longitude }} />
        </MapView>
        }
        {selectedLocation.id !== '' && region?.latitude !== '' && region?.longitude !== '' && locationsView()}
        </View>);
}

const styles = StyleSheet.create({
    baseContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white,
    },
    ItemSeparatorView: {
        height: 1,
        backgroundColor: Colors.black,
        opacity: 0.075,
    },
    mapsView: {
        flex: 0.67,
        width: '100%',
    },
    locationsView: {
        flex: 0.33,
        width: '100%',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    locInfo: {
        width: '50%',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        backgroundColor: Colors.white,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    locTemp: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: moderateScale(20, 0.80),
        lineHeight: moderateScale(30),
        color: Colors.black,
        fontFamily: Fonts.FontRegular,
    },
    cityName: {
        color: Colors.black,
        fontSize: moderateScale(20, 0.80),
        lineHeight: moderateScale(30),
        fontFamily: Fonts.FontMedium,
    },
    cityWeather: {
        color: Colors.black,
        fontSize: moderateScale(14, 0.80),
        lineHeight: moderateScale(24),
        fontFamily: Fonts.FontRegular,
    },
    weatherParams: {
        color: Colors.black,
        fontSize: moderateScale(14, 0.80),
        lineHeight: moderateScale(24),
        fontFamily: Fonts.FontRegular,
    },
    weatherTemp: {
        color: Colors.black,
        fontSize: moderateScale(30, 0.80),
        lineHeight: moderateScale(34),
        fontFamily: Fonts.FontRegular,
    },
});

export { Location };
