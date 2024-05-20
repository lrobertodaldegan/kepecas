import {useState} from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from "react-native";
import Button1 from "../components/Button1";
import Link from "../components/Link";
import Label from "../components/Label";
import Logo from "../components/Logo";
import CacheService from '../Service/Cache/CacheService';
import {login} from '../Service/Rest/RestService';
import Icon from '../components/Icon';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const LoginScreen = ({navigation}) => {
  const [u, setU] = useState(null);
  const [p, setP] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [enterLbl, setEnterLbl] = useState('Entrar');

  const handleLogin = () => {
    setEnterLbl('Entrando...');

    login({login:u, password:p}).then(response => {
      if(response.status == 200){
        CacheService.register('@jwt', response.data.token)
          .then(() => navigation.navigate('search'))
          .catch((err) => console.log(err));
      } else {
        setEnterLbl('Ops! Tente novamente.');
      }
    })
  }

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}
          keyboardDismissMode='on-grag'
          keyboardShouldPersistTaps='always'>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Bem-vindo de volta!'/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setU(val)} value={u}
              placeholder='Seu login'/>

          <View style={[styles.input, styles.inputPassWrap]}>
            <TextInput style={styles.inputPass} placeholderTextColor='#134C83' 
              onChangeText={(val) => setP(val)} value={p}
              secureTextEntry={showPass === false}
              onEndEditing={handleLogin}
              placeholder='Sua senha'/>

            <TouchableHighlight underlayColor={'transparent'}
              onPress={() => setShowPass(!showPass)}>
              <Icon icon={showPass === true ? faEyeSlash : faEye} 
                  style={styles.passIcon}/>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.btnWrap}>
          <Button1 label={enterLbl} action={() => handleLogin()}/>

          <Link value='Clique aqui se esqueceu a sua senha.' 
              style={styles.legend} action={() => navigation.navigate('reset')}/>
        </View>
      </ScrollView>
    </>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#B6ECFF',
    width:screen.width,
    height:screen.height,
    padding:20,
  },
  logo:{
    marginTop:50,
    alignSelf:'center'
  },
  inputsWrap:{
    marginTop: (screen.height / 3.5) - 50
  },
  input:{
    borderRadius:10,
    borderWidth:1,
    borderColor:'#0489CC',
    height: 50,
    width: screen.width - 40,
    marginTop:10,
    backgroundColor:'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Regular',
    color:'#134C83'
  },
  inputPassWrap:{
    flexDirection:'row',
    alignItems:'center'
  },
  inputPass:{
    width:(screen.width - 40) * 0.83,
    fontFamily:'Montserrat-Regular',
    color:'#134C83'
  },
  btnWrap:{
    marginTop: (screen.height / 3.5) - 50
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
});

export default LoginScreen;