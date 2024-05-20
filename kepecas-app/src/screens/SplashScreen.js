import React from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import Logo from "../components/Logo";


const SplashScreen = () => {
  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo}/>
      </View>
    </>
  );
}

const size = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
}

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#B6ECFF',
    width:size.width,
    height:size.height,
    padding:20,
  },
  logo:{
    marginTop:50,
    alignSelf:'center'
  },
});

export default SplashScreen;