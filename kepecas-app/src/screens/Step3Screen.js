import React, {useState, useEffect} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Linking
} from "react-native";
import Button1 from "../components/Button1";
import Label from "../components/Label";
import Logo from "../components/Logo";
import CacheService from '../Service/Cache/CacheService';
import { useIsFocused } from '@react-navigation/native';

const SITE = 'https://kepecas.lucasrobertodev.com.br/';

const Step3Screen = ({navigation}) => {
  const [link, setLink] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    CacheService.get('@jwt').then((jwt) => {
      if(jwt && jwt !== null){
        setLink(`${SITE}?tkn=${jwt}`);
      } else {
        setLink(`${SITE}`);
      }
    });
  }, [isFocused]);

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label style={styles.title} value={`Quase lá!`}/>
          <Label style={styles.desc} value="Toque no botão abaixo para informar seus dados de pagamento. Abriremos uma nova tela para nossa página segura com nosso parceiro Marcado Pago. Ao finalizar o pagamento, você poderá voltar para o app novamente."/>
          
          <Button1 label='Prosseguir' style={styles.btn} 
              action={() => Linking.openURL(link)}/>
        </View>
      </View>
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
    marginTop: 50
  },
  title:{
    fontFamily:'Montserrat-Bold',
    fontSize:20,
    marginBottom: 20,
    textAlign:'center'
  },
  desc:{
    textAlign:'justify'
  },
  inputLinkWrap:{
    flexDirection:'row'
  },
  input:{
    borderRadius:10,
    borderWidth:1,
    borderColor:'#0489CC',
    height: 50,
    width: screen.width - (screen.width / 5) - 40,
    marginTop:10,
    backgroundColor:'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Regular',
    color:'#134C83'
  },
  txtArea:{
    borderRadius:10,
    borderWidth:1,
    borderColor:'#0489CC',
    height: 100,
    width: screen.width - 40,
    marginTop:10,
    backgroundColor:'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Regular'
  },
  btn:{
    marginTop: 30
  },
  addLink: {
    justifyContent:'center',
    alignItems:'center',
    width:(screen.width / 5)
  },
  btnFoto: {
    borderRadius:10,
    borderWidth:1,
    borderColor:'#0489CC',
    height: 150,
    width: screen.width - 40,
    marginTop:10,
    backgroundColor:'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems:"center"
  }
});

export default Step3Screen;