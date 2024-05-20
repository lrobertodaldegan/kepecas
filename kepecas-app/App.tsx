import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ResetSenhaScreen from './src/screens/ResetSenhaScreen';
import ResetLoginScreen from './src/screens/ResetLoginScreen';
import ResetCodeValidationScreen from './src/screens/ResetCodeValidationScreen';
import Step1Screen from './src/screens/Step1Screen';
import Step2Screen from './src/screens/Step2Screen';
import Step3Screen from './src/screens/Step3Screen';
import Step4Screen from './src/screens/Step4Screen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import SearchDetailScreen from './src/screens/SearchDetailScreen';
import FeedScreen from './src/screens/FeedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TryAgainScreen from './src/screens/TryAgainScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SplashScreen from './src/screens/SplashScreen';

const ScreensOptions = {
  headerShown: false,
  headerTintColor: '#fff',
}

const config = {
  screens: {
    welcome: '',
    details: 'details',
    login: 'login',
    reset:'reset',
    resetLogin:'resetLogin',
    codeValidation:'codeValidation',
    step1:'step1',
    step2:'step2',
    step3:'step3',
    home:'home',
    search:'search',
    searchDetail:'searchDetail',
    feed:'feed',
    profile:'profile',
    error:'error',
  },
};

const linking = {
  prefixes: ['com.kepecas://app/'],
  config,
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  mobileAds().initialize();

  return (
    <NavigationContainer 
        linking={linking} 
        fallback={<SplashScreen />}>
      
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={ScreensOptions} />
        <Stack.Screen name="details" component={DetailsScreen} options={ScreensOptions} />
        <Stack.Screen name="login" component={LoginScreen} options={ScreensOptions} />
        <Stack.Screen name="reset" component={ResetSenhaScreen} options={ScreensOptions} />
        <Stack.Screen name="resetLogin" component={ResetLoginScreen} options={ScreensOptions} />
        <Stack.Screen name="codeValidation" component={ResetCodeValidationScreen} options={ScreensOptions} />
        <Stack.Screen name="step1" component={Step1Screen} options={ScreensOptions} />
        <Stack.Screen name="step2" component={Step2Screen} options={ScreensOptions} />
        <Stack.Screen name="step3" component={Step3Screen} options={ScreensOptions} />
        <Stack.Screen name="step4" component={Step4Screen} options={ScreensOptions} />
        <Stack.Screen name="home" component={HomeScreen} options={ScreensOptions} />
        <Stack.Screen name="search" component={SearchScreen} options={ScreensOptions} />
        <Stack.Screen name="searchDetail" component={SearchDetailScreen} options={ScreensOptions} />
        <Stack.Screen name="feed" component={FeedScreen} options={ScreensOptions} />
        <Stack.Screen name="profile" component={ProfileScreen} options={ScreensOptions} />
        <Stack.Screen name="error" component={TryAgainScreen} options={ScreensOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
