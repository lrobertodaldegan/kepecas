import {useEffect, useState} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  PermissionsAndroid,
} from "react-native";
import Button1 from "../../components/Button1";
import Button2 from "../../components/Button2";
import Label from "../../components/Label";
import Logo from "../../components/Logo";
import CacheService from '../../Service/Cache/CacheService';
import {post} from '../../Service/Rest/RestService';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import Geolocation from 'react-native-geolocation-service';


const WelcomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigation();

  let devId = DeviceInfo.getDeviceId();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de acesso à localização',
          message: 'Podemos ler sua localização?',
          buttonNeutral: 'Agora não',
          buttonNegative: 'Não',
          buttonPositive: 'Sim',
        },
      );

      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    requestLocationPermission().then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => console.log(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`),
          error => {console.log(error.code, error.message);},
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }, []);

  useEffect(() => {
    CacheService.get('@jwt').then((jwt) => {
      console.log('Token encontrado em cache!');

      post('/user/device', {deviceId:devId})
      .then((response) => {
        setLoading(false);
        
        if(response.status === 200){
          if(response.data.valid)
            navigate.navigate('home');
        }
      })
      .catch((err) => console.log(err));
    });
  }, []);

  const load = () => {
    if(loading){
      return <Loader/>
    } else {
      return (
        <View style={styles.btnWrap}>
          <Label value='Seja muito bem-vindo!' style={styles.legend}/>

          <Button2 label='É o meu primeiro acesso' action={() => navigation.navigate('step1')}/>
          <Button1 label='Já sou cadastrado!' action={() => navigation.navigate('login')}/>
        </View>
      );
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.lblWrap}>
          <Label value='Olá, você que ama carro!' style={styles.title}/>

          <Label value='Este é o seu mais novo consultor automotivo!'/>
        </View>

        {load()}
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
  lblWrap:{
    marginTop: (size.height / 3.5) - 50
  },
  btnWrap:{
    marginTop: (size.height / 3.5) - 50
  },
  title: {
    fontSize:26,
    fontFamily:'Montserrat-Bold',
    marginBottom:5
  },
  legend: {
    fontSize: 14,
    marginBottom: 10,
  },
  loadingIco:{
    marginTop:50
  },
});

export default WelcomeScreen;