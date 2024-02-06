import {useState, useEffect} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import Button1 from "../../components/Button1";
import Label from "../../components/Label";
import Logo from "../../components/Logo";
import Divider from '../../components/Divider';
import DeviceInfo from 'react-native-device-info';
import CacheService from '../../Service/Cache/CacheService';
import {post} from '../../Service/Rest/RestService';

const Step1Screen = ({navigation}) => {
  const [nome, setNome] = useState(null);
  const [login, setLogin] = useState(null);
  const [senha, setSenha] = useState(null);
  const [whats, setWhats] = useState(null);
  const [email, setEmail] = useState(null);
  const [btnLbl, setBtnLbl] = useState(null);

  useEffect(() => {
    setBtnLbl('Continuar');
  }, []);

  const handleSubmit = () => {
    setBtnLbl('Carregando...');

    let deviceId = DeviceInfo.getDeviceId();
    let uniqueId = DeviceInfo.getUniqueIdSync();

    let device = {
      id: deviceId,
      uniqueId: uniqueId,
    }

    let user = {
      name: nome,
      login: login,
      phone: whats,
      email: email
    }

    post('/auth/signup', {...user, password:senha, device:device}).then(response => {
      if(response.status == 201){
        CacheService.register('@user', JSON.stringify(user))
          .then(() => handleSignin())
          .catch((err) => console.log(err));
      } else {
        navigation.navigate('error');
      }
    }).catch(err => {
      console.log(err); 
      navigation.navigate('error');
    });
  }

  const handleSignin = () => {
    post('/auth/signin', {login:login, password:senha}).then(response => {
      if(response.status == 200){
        CacheService.register('@jwt', response.data.token)
          .then(() => navigation.navigate('step2'))
          .catch((err) => console.log(err));
      }
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <ScrollView style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='É um prazer te conhecer!'/>
          <Label value='Informe seus dados para o cadastro:'/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setNome(val)} value={nome}
              placeholder='Seu nome'/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setLogin(val)} value={login}
              placeholder='Seu novo login'/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setSenha(val)} value={senha}
              placeholder='Sua nova senha'/>

          <Divider />

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setWhats(val)} value={whats}
              placeholder='Seu número do WhatsApp'/>

          <Label value='ou' style={styles.ou}/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setEmail(val)} value={email}
              placeholder='Seu e-mail'/>

          <Button1 label={btnLbl} style={styles.continuar} 
              action={() => handleSubmit()}/>

          <Label style={styles.legend}
              value='Fique tranquilo! Não compartilharemos nenhum dos seus dados cadastrais com terceiros!'/>
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
    marginTop: (screen.height / 3.5) - 150
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
  btnWrap:{
    marginTop: (screen.height / 3.5) - 50
  },
  title: {
    fontSize:26,
    fontFamily:'Montserrat-Bold',
    marginBottom:5
  },
  legend: {
    fontSize: 12,
    marginBottom: 10,
  },
  ou:{
    alignSelf:'center'
  },
  continuar:{
    marginTop: 20
  }
});

export default Step1Screen;