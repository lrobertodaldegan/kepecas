import { 
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Label from "./Label";


const Button2 = ({label, style={}, action=() => null}) => {
  return (
    <TouchableHighlight underlayColor='#fafafa' 
        style={[styles.btn, style]} onPress={() => action()}>

      <Label value={label} style={styles.lbl}/>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'#fafafa',
    borderRadius:10,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  lbl:{
    color:'#134C83',
    fontSize:16, 
  }
});

export default Button2;