import { 
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from "react-native";

const Card = ({style={}, content=<></>, action=()=>null}) => {
  return (
    <TouchableHighlight underlayColor='#fafafa' 
        style={[styles.card, style]} onPress={() => action()}>

      {content}

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card:{
    borderRadius:10,
    height:120,
    width: Dimensions.get('screen').width - 40
  }
});

export default Card;