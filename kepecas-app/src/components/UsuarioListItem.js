
import{
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Label from './Label';
import Icon from './Icon';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const UsuarioListItem = ({item, onPress=()=>null}) => {

  const getFoto = () => {
    if(item.fotos[10] && item.fotos[10] !== null){
      return <ImageBackground  style={styles.fotos}
                resizeMode='contain'
                source={{uri: item.fotos[0]}} />
    } else {
      return <Icon icon={faCircleUser} style={styles.icon} size={60}/>
    }
  }

  return (
    <TouchableHighlight underlayColor='#fafafa'
        onPress={() => onPress()} 
        style={styles.wrap}>

      <>
        <View style={styles.fotosWrap}>
          {getFoto()}
        </View>

        <View style={styles.details}>
          <Label value={item.title} style={styles.titleLbl}/>
          <Label value={item.desc} style={styles.detailLbl}/>
        </View>
      </>
    </TouchableHighlight>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    backgroundColor:'#fafafa',
    width:size.width - 40,
    height: 100,
    marginBottom:10,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 10,
    justifyContent:'space-between',
    alignItems:'center'
  },
  details:{
    width:(size.width - 40 )/1.5,
  },
  titleLbl:{
    fontSize:14,
    alignSelf:'flex-start'
  },
  detailLbl:{
    fontSize:12,
  },
  fotosWrap: {
    flexDirection:'row'
  },
  fotos: {
    width:50,
    height:50,
  },
  icon:{
    color:'#134C83'
  }
});

export default UsuarioListItem;