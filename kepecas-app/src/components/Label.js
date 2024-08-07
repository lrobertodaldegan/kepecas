import { 
  Text,
  StyleSheet,
} from "react-native";


const Label = ({value, style={}, lines=null}) => {
  if(lines && lines !== null){
    return <Text numberOfLines={lines} style={[styles.lbl, style]}>{value}</Text>;
  } else {
    return <Text style={[styles.lbl, style]}>{value}</Text>;
  }
}

const styles = StyleSheet.create({
  lbl:{
    color:'#134C83',
    fontSize:16,
    fontFamily:'Montserrat-Regular'
  }
});

export default Label;