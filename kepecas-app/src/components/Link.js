import { 
  TouchableHighlight,
} from "react-native";
import Label from "./Label";


const Link = ({value, action=()=>null, style={}}) => {
  return (
    <TouchableHighlight underlayColor='#fafafa' onPress={() => action()}>

      <Label value={value} style={style}/>

    </TouchableHighlight>
  );
}

export default Link;