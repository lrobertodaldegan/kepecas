import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import Button2 from "../../components/Button2";
import Label from "../../components/Label";


const TryAgainScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#B6ECFF' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <View style={styles.lblWrap}>
          <Label value='Ops! Tivemos problemas ao processar os dados necessários!' 
            style={styles.title}/>
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
    marginTop: (size.height / 3.5) - 50
  },
  title: {
    fontSize:26,
    fontFamily:'Montserrat-Bold',
    marginBottom:5
  },
});

export default TryAgainScreen;