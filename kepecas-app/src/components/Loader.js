import { 
  ActivityIndicator,
  StyleSheet
} from "react-native";


const Loader = ({margin=true, color='#134C83'}) => {
  return (
    <ActivityIndicator color={color} style={margin ? styles.loadingIco : {}}/>
  );
}

const styles = StyleSheet.create({
  loadingIco:{
    marginTop:50
  },
});

export default Loader;