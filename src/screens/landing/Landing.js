/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as Constants from '@constants/Constants';
import { Strings, Colors, Fonts, Images } from '@res';
import { pushNewScreen } from '@navigation/navigation';
import { moderateScale } from '@utils/utils';
import GetLocation from 'react-native-get-location';
import { useSelector, useDispatch } from 'react-redux';
import * as LocationAction from '@actions/LocationAction';

function Landing(props) {

    const locationData = useSelector(state => state.locationData);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getUserLocation() {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 0,
            }).then((location) => {
                console.log(location);
                dispatch(LocationAction.getLocations(true, location.latitude, location.longitude));
            }).catch((error) => {
                console.log('Error: ', error);
            });
        }
        getUserLocation();
      }, [dispatch]);

    const locationsView = () => {
        return (<View style={styles.locationsView}>
            {locationData?.locations?.length > 0 && <FlatList
                ItemSeparatorComponent={({highlighted}) => (
                    <View style={styles.ItemSeparatorView} />
                )}
                nestedScrollEnabled={true}
                data={locationData?.locations}
                style={{width: '100%'}}
                renderItem={({item, index}) => locationItemView(item, index)}
                keyExtractor={item => item.id}
                numColumns={1}
                contentContainerStyle={styles.locationItemsWrapper}
                onEndReachedThreshold={0.4}
                onEndThreshold={0}
            />}
        </View>);
    };

    const locationItemView = (item, index) => {
        return (<TouchableOpacity key={`location-item-${index}`} style={styles.locItemView} onPress={() => goToLocationView(item.id, item?.coord?.lat, item?.coord?.lon)}>
            <View style={styles.locNameView}>
                <Text style={styles.locName}>{item.name}</Text>
                <Text style={styles.locWeather}>{item?.weather?.[0].main}</Text>
            </View>
            <View style={styles.locTempView}>
                <Text style={styles.locTemp}>{item?.main?.temp}°c</Text>
            </View>
        </TouchableOpacity>);
    };

    const goToLocationView = (locationId, lat, lon) => {
        pushNewScreen(props.componentId, Constants.LOCATION_ITEM, Strings.landingPageTitle, {
            topBar: {
                visible: true,
                drawBehind: false,
                animate: false,
                title : {
                    text: Strings.landingPageTitle,
                    fontFamily: Fonts.FontMedium,
                    alignment: 'center',
                    fontSize: moderateScale(20),
                    color: Colors.white,
                },
                leftButtons: [
                    {
                    id: 'backButton',
                    icon: Images.backIcon,
                    },
                ],
                background: {
                    color: Colors.green,
                },
            },
        }, { locationId: locationId, lat: lat, lon: lon });
    };

    return (<View style={styles.baseContainer}>{locationsView()}</View>);
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
    locationItemsWrapper: {
        width: '100%',
    },
    ItemSeparatorView: {
        height: 1,
        backgroundColor: Colors.black,
        opacity: 0.075,
    },
    locationsView: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    locItemView: {
        width: '100%',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    locNameView: {
        flex: 1,
    },
    locTempView: {
        backgroundColor: Colors.white,
    },
    locName: {
        color: Colors.black,
        fontSize: moderateScale(16, 0.80),
        lineHeight: moderateScale(24),
        fontFamily: Fonts.FontRegular,
    },
    locWeather: {
        color: Colors.black,
        fontSize: moderateScale(12, 0.80),
        lineHeight: moderateScale(20),
        fontFamily: Fonts.FontRegular,
    },
    locTemp: {
        fontSize: moderateScale(20, 0.80),
        lineHeight: moderateScale(30),
        color: Colors.black,
        fontFamily: Fonts.FontRegular,
    },
});

export { Landing };
