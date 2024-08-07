import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import Button2 from "../components/Button2";
import Label from "../components/Label";


const TryAgainScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <View style={styles.lblWrap}>
          <Label value='Ops! Algo de errado não está certo!' 
            style={styles.title}/>
          <Label value='Garanta que todos os dados necessários foram informados adequadamente. Se o problema persistir, entre em contato com a gente.' 
            style={styles.subtitle}/>
        </View>

        <View style={styles.btnWrap}>
          <Button2 label='Tentar novamente' action={() => navigation.goBack()}/>
        </View>
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
  lblWrap:{
    marginTop: (size.height / 3.5) - 50
  },
  btnWrap:{
    marginTop: size.height * 0.02
  },
  title: {
    fontSize:26,
    fontFamily:'Montserrat-Bold',
  },
  subtitle: {
    fontSize:14,
    marginVertical: size.height * 0.02
  },
});

export default TryAgainScreen;