import { 
  StyleSheet,
  Image,
} from "react-native";
import logo from '../assets/img/logo_menor.png';

const Logo = ({style={}}) => <Image style={[styles.logo, style]} source={logo}/>

const styles = StyleSheet.create({
  logo:{
    
  }
});

export default Logo;