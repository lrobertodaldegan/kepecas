import {useState} from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput
} from "react-native";
import Button1 from "../components/Button1";
import Label from "../components/Label";
import Logo from "../components/Logo";
import {post} from "../Service/Rest/RestService";
import CacheService from '../Service/Cache/CacheService';

const ResetCodeValidationScreen = ({navigation}) => {
  const [code, setCode] = useState(null);

  const handleValidation = () => {
    if(code && code > 0){
      post('/user/code', {code:code}).then(response => {
        if(response.status == 200 && response.data.token){
          CacheService.register('@jwt', response.data.token)
            .then(() => navigation.navigate('resetLogin'))
            .catch((err) => console.log(err));
        }
      }).catch(err => {console.log(err);navigation.navigate('error');});
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Confirme o código enviado para o seu e-mail:'/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setCode(val)} value={code}
              secureTextEntry={true}
              placeholder='Seu código (Ex.: 7777)'/>

          <Button1 label='Validar' action={() => handleValidation()}/>
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
    marginTop:15,
    backgroundColor:'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Regular',
    color:'#134C83'
  },
  legend: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export default ResetCodeValidationScreen;