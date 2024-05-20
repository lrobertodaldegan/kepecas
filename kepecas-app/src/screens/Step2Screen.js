import {useState, useEffect} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import Label from "../components/Label";
import Logo from "../components/Logo";
import Divider from '../components/Divider';
import {post} from '../Service/Rest/RestService'; 


const Step2Screen = ({navigation}) => {
  const [qtdCarros, setQtdCarros] = useState(1);
  const [placas, setPlacas] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [btnLbl, setBtnLbl] = useState(null);

  useEffect(() => {
    setBtnLbl('Continuar');
  }, []);

  const handlePlacas = (idx, val) => {
    placas[idx] = val;

    setPlacas(placas);
  }
  const handleMarcas = (idx, val) => {
    marcas[idx] = val;

    setMarcas(marcas);
  }
  const handleModelos = (idx, val) => {
    modelos[idx] = val;

    setModelos(modelos);
  }
  const handleAnos = (idx, val) => {
    anos[idx] = val;

    setAnos(anos);
  }

  const handleSubmit = async () => {
    setBtnLbl('Carregando...');

    let created = 0;

    try{
      for(let i=0;i<qtdCarros;i++){
        if(placas[1] && marcas[i] && modelos[i] && anos[i]){
          let car = {
            placa:placas[i],
            marca:marcas[i],
            modelo:modelos[i],
            ano:anos[i]
          }
  
          let response = await post('/usercar', car);
  
          if(response.status == 201){
            created = created + 1;
          }
        } else {
          created = created + 1;//workaround for blank form
        }
      }

      if(created == qtdCarros)
        navigation.navigate('step3');
      else
        navigation.navigate('error');
    }catch(err) {
      console.log(err);
      
      navigation.navigate('error');
    }
  }

  const renderForms = () => {
    let forms = [];

    for(let i=0; i<qtdCarros;i++){
      forms.push((
        <View key={`${i}`}>
          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => handlePlacas(i, val)} value={placas[i]}
              placeholder='Placa'/>
  
          <TextInput style={styles.input} placeholderTextColor='#134C83' 
              onChangeText={(val) => handleMarcas(i, val)} value={marcas[i]}
              placeholder='Marca'/>
  
          <View style={styles.inputsLineWrap}>
            <TextInput style={[styles.input, styles.inputModel]} placeholderTextColor='#134C83' 
                onChangeText={(val) => handleModelos(i, val)} value={modelos[i]}
                placeholder='Modelo'/>
  
            <TextInput style={[styles.input, styles.inputYear]} placeholderTextColor='#134C83' 
                keyboardType='numeric'
                onChangeText={(val) => handleAnos(i, val)} value={anos[i]}
                placeholder='Ano'
                onEndEditing={() => handleSubmit()}/>
          </View>
  
          <Divider />
        </View>
      ));
    }

    return forms;
  }

  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <ScrollView style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Agora nos conte sobre seu(s) carro(s):'/>

          {renderForms()}

          <Button2 label='Adicionar mais um carro' action={() => setQtdCarros(qtdCarros+1)}/>

          <Button1 label={btnLbl} action={() => handleSubmit()}/>

          <Label style={styles.legend}
              value='Fique tranquilo! Não compartilharemos nenhum dos seus dados com terceiros!'/>
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
    marginTop: 50
  },
  inputsLineWrap:{
    flexDirection:'row'
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
  inputModel:{
    width:screen.width - (screen.width / 3) - 40,
    marginRight: 10
  },
  inputYear:{
    width:(screen.width / 3) - 10,
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
    marginBottom: 50,
  },
});

export default Step2Screen;