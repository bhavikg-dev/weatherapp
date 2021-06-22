/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';

import { Landing, Location } from '@screens';
import * as Constants from '@constants/Constants';
import { Store } from '@config/store';

  function ReduxProvider(Component) {
    return props => (
      <StoreProvider store={Store}>
        <SafeAreaView>
          <Component {...props}/>
        </SafeAreaView>
      </StoreProvider>
    );
  }

  export function registerScreens() {
    Navigation.registerComponent(Constants.LOCATIONS, () => ReduxProvider(Landing));
    Navigation.registerComponent(Constants.LOCATION_ITEM, () => ReduxProvider(Location));
  }
