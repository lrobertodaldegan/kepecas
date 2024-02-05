import { 
  View,
  StyleSheet,
} from "react-native";

const Divider = ({style={}}) => <View style={[styles.wrap, style]}></View>

const styles = StyleSheet.create({
  wrap: {
    borderColor: '#0489CC',
    borderWidth:1,
    height:1,
    width:50,
    marginVertical:10,
    alignSelf:'center'
  }
});

export default Divider;