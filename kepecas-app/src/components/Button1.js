import { 
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Label from "./Label";


const Button1 = ({label, style={}, action=() => null}) => {
  return (
    <TouchableHighlight underlayColor='#fafafa' 
        style={[styles.btn, style]} onPress={() => action()}>

      <Label value={label} style={styles.lbl}/>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'#134C83',
    borderRadius:10,
    marginVertical:10,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  lbl:{
    color:'#fafafa',
    fontSize:16,
  }
});

export default Button1;