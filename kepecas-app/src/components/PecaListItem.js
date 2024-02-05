import {useState} from 'react';
import{
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import Icon from './Icon';


const PecaListItem = ({item, onSelect=() => null}) => {
  const [selected, setSelected] = useState(false);

  const getFotos = () => {
    let fotos = [];

    if(item.fotos && item.fotos.length > 0){
      item.fotos.map((f) => {
        fotos.push(<ImageBackground style={styles.fotos}
                      resizeMode='contain' source={{uri: f}} />);
      });
    } else {
      return <></>;
    }

    return fotos;
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.details}>
        <Label value={item.title} style={styles.titleLbl}/>
        <Label value={item.desc} style={styles.detailLbl}/>
        <View style={styles.fotosWrap}>
          {getFotos()}
        </View>
      </View>
      <View style={styles.selectBtn}>
        <TouchableHighlight underlayColor='#fafafa'
            onPress={() => setSelected(!selected)}>
          <Icon icon={selected === true ? faSquareCheck : faSquare} 
              style={styles.icon} size={20}/>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    backgroundColor:'#fafafa',
    width:size.width - 40,
    height: 150,
    marginBottom:10,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 10,
    justifyContent:'space-between',
    alignItems:'center'
  },
  titleLbl:{
    fontSize:14,
  },
  detailLbl:{
    fontSize:12,
  },
  fotosWrap: {
    flexDirection:'row'
  },
  fotos: {
    width:80,
    height:80,
  },
  icon:{
    color:'#134C83'
  }
});

export default PecaListItem;