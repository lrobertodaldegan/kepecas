import React from 'react';
import {
  Text
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import ResetSenhaScreen from './src/screens/ResetSenha/ResetSenhaScreen';
import ResetLoginScreen from './src/screens/ResetSenha/ResetLoginScreen';
import ResetCodeValidationScreen from './src/screens/ResetSenha/ResetCodeValidationScreen';
import Step1Screen from './src/screens/Step1/Step1Screen';
import Step2Screen from './src/screens/Step2/Step2Screen';
import Step3Screen from './src/screens/Step3/Step3Screen';
import HomeScreen from './src/screens/Home/HomeScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import SearchDetailScreen from './src/screens/SearchDetail/SearchDetailScreen';
import FeedScreen from './src/screens/Feed/FeedScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import TryAgainScreen from './src/screens/TryAgain/TryAgainScreen';
import DetailsScreen from './src/screens/Details/DetailsScreen';
import SplashScreen from './src/screens/Splash/SplashScreen';

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
