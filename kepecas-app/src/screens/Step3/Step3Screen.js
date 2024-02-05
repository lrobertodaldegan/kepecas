import {useState} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableHighlight
} from "react-native";
import Button1 from "../../components/Button1";
import Label from "../../components/Label";
import Logo from "../../components/Logo";
import Divider from '../../components/Divider';

//TODO ainda não estamos aprofundando os dados de usuários e perfil de usuários para rede social
const Step3Screen = ({navigation}) => {
  const [sobre, setSobre] = useState(null);
  const [url, setUrl] = useState(null);
  const [link, setLink] = useState(null);

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Se quiser, você pode adicionar mais alguns detalhes sobre você e seu carro:'/>

          <TouchableHighlight underlayColor='#fafafa' 
              style={styles.btnFoto} onPress={() => action()}>

            <>
            <Label style={{fontSize:30}} value="+"/>
              <Label value='Clique para adicionar uma foto'/>
            </>

          </TouchableHighlight>

          <TextInput style={styles.txtArea} placeholderTextColor='#134C83' 
              onChangeText={() => setSobre(placa)} value={sobre}
              placeholder='Fale mais sobre você (até 120 caracteres)'/>

          <Divider />

          <View style={styles.inputLinkWrap}>
            <View style={styles.inputLinks}>
              <TextInput style={styles.input} placeholderTextColor='#134C83' 
                  onChangeText={() => setLink(placa)} value={link}
                  placeholder='Nome do link'/>

              <TextInput style={styles.input} placeholderTextColor='#134C83' 
                  onChangeText={() => setUrl(placa)} value={url}
                  placeholder='URL'/>
            </View>
            <View style={styles.addLink}>
              <Label style={{fontSize:30}} value="+"/>
            </View>  
          </View>

          <Button1 label='Pronto!' style={styles.btn} action={() => navigation.navigate('home')}/>
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