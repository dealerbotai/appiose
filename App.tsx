/**
 * Eskin Store - iOS App
 * Botas artesanales de alta calidad
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import {RootStackParamList} from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: '#0a0a0a'},
            headerTintColor: '#d4a574',
            headerTitleStyle: {fontWeight: '700'},
            contentStyle: {backgroundColor: '#0a0a0a'},
            animation: 'slide_from_right',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Eskin',
              headerTitleStyle: {
                fontWeight: '800',
                fontSize: 22,
                color: '#d4a574',
              },
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={({route}) => ({
              title: route.params.product.sku,
              headerBackTitle: 'Catálogo',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
