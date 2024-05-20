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
import {post} from '../Service/Rest/RestService';


const ResetSenhaScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Enviar código');

  const handleSendLink = () => {
    setBtnLbl('Enviando...');

    post('/user/forgot', {email:email}).then(response => {
      if(response.status == 200){
        navigation.navigate('codeValidation');
      } else {
        navigation.navigate('error');
      }
    }).catch(err => {console.log(err);navigation.navigate('error');});
  }

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Confirme seu e-mail:'/>

          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => setEmail(val)} value={email}
              placeholder='E-mail cadastrado'/>

          <Button1 label={btnLbl} action={() => handleSendLink()}/>

          <Label style={styles.legend}
              value='Enviaremos um código de confirmação para reset de senha ao o e-mail cadastrado.'/>
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

export default ResetSenhaScreen;