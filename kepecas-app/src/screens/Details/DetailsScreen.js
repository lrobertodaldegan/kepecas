import React from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import Button1 from "../../components/Button1";
import Label from "../../components/Label";
import Logo from "../../components/Logo";
import Divider from '../../components/Divider';

const DetailsScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <ScrollView style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label style={styles.title} value='Bem-vindo ao Clube Kepeças!'/>

          <Label style={styles.desc} 
              value='A assinatura mensal do clube custa apenas R$ 9,00, é renovada automaticamente todos os meses e com ela você acessa todos os nossos benefícios:'/>
          
          <Label style={styles.legend} 
              value={`- Descontos exclusivos dos membros;\n- Acesso exclusivo a lista de parceiros e serviços;\n- Atendimento personalizado;`}/>

          <Label style={styles.desc} value='Para continuar é muito fácil:'/>

          <Label style={styles.desc} value='1 - Informe seus dados para cadastro;'/>

          <Label style={styles.desc} value='2 - Informe os dados do seu veículo;'/>
          
          <Label style={styles.desc} value='3 - Informe os dados do seu cartão de crédito para cobrança da assinatura mensal do clube*;'/>

          <Label style={styles.desc} value={`\n\nFinalizando os 3 passos acima você fará parte do melhor clube de beneficios automotivos da região!`}/>

          <Button1 label='Continuar' style={styles.continuar} 
              action={() => navigation.navigate('step1')}/>

          <Label style={styles.legend}
              value='Fique tranquilo! Não compartilharemos nenhum dos seus dados cadastrais com terceiros!'/>

          <Divider />

          <Label style={styles.legend}
              value='* Os dados de cartão de crédito para cobrança da mensalidade da assinatura são enviados ao parceiro Mercado Pago, o qual passa a ser responsável pelo armazenamento dos dados fornecidos para pagamento e também responsável por efetuar as cobranças de mensalidade.'/>
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
    marginTop: (screen.height / 3.5) - 200
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
    fontSize:20,
    fontFamily:'Montserrat-Bold',
    marginBottom:20
  },
  legend: {
    fontSize: 12,
    marginBottom: 10,
  },
  desc: {
    textAlign:'justify',
    marginBottom: 10,
  },
  ou:{
    alignSelf:'center'
  },
  continuar:{
    marginTop: 20
  }
});

export default DetailsScreen;