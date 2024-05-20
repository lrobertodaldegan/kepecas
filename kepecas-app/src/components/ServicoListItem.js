import {useState, useEffect} from 'react';
import{
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Linking,
  Image,
} from 'react-native';
import { faMapLocation, faShop, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import Icon from './Icon';
import {post} from '../Service/Rest/RestService';
import Loader from './Loader';

const ServicoListItem = ({item, onSelect=() => null, coordinates={}, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(0);

  const init = async () => {
    try{
      if(coordinates && coordinates.longitude && coordinates.latitude){
        if(distance < 1){
          let itemCoord = item && item.coordinates 
                                    ? JSON.parse(item.coordinates)
                                    : null;
          if(itemCoord != null){
            let body = {coords:[coordinates, itemCoord]};

            let response = await post('/service/distance', body);

            if(response.status == 200)
              setDistance(Math.round(response.data));
          }
        }
      }

      setLoading(false);
    }catch(ex){
      console.log(ex);
    }
  }

  const renderDistance = () => {
    if(loading){
      return <Loader margin={false}/>
    } else {
      if(distance > 0){
        return (
          <Label value={`Aprox. ${(distance/1000).toFixed(2)} KM de você`} 
              style={[styles.lbl, styles.distLbl]}/>
        );
      }
    }
  }

  const renderMapLink = () => {
    const url2 = Platform.select({
      ios: `maps://0,0?q=${item.mapAddr}(${item.name})`,
      android: `geo://0,0?q=${item.mapAddr}(${item.name})`
    });

    return (
      <TouchableHighlight underlayColor='#fafafa'
          onPress={() => Linking.openURL(url2)}>
        <Icon icon={faMapLocation} style={styles.icon} size={20}/>
      </TouchableHighlight>
    )
  }

  const renderLogo = () => {
    if(item.logo && item.logo != null){
      return <Image source={{uri: item.logo}} style={styles.logo}/>
    } else {
      return <Icon icon={faShop} style={styles.icon} size={30}/>
    }
  }

  useEffect(() => {init();}, []);

  return (
    <TouchableHighlight underlayColor='#fafafa' style={styles.wrap}
        onPress={() => navigation.navigate('searchDetail', {itemType:'service', coords: coordinates, item: item})}>

      <>
        <View style={styles.fotoWrap}>
          {renderLogo()}
        </View>

        <View style={styles.details}>
          <Label value={item.name} style={[styles.lbl, styles.titleLbl]}/>
          <Label value={item.cat} style={[styles.lbl, styles.detailLbl]}/>
          <Label value={item.catDetail} style={[styles.lbl, styles.detailLbl]}/>
          <Label value={item.mapAddr} style={[styles.lbl, styles.detailLbl]}/>
          {renderDistance()}
        </View>

        <View style={styles.selectBtn}>
          {renderMapLink()}

          <TouchableHighlight underlayColor='#fafafa' style={styles.phoneIcon}
              onPress={() => Linking.openURL(`https://wa.me/55${item.phone}/?text=Olá!%20Eu%20participo%20do%20clube%20kepeças%20e%20gostaria%20dos%20seus%20serviços...`)}>
            <Icon icon={faCommentAlt} style={styles.icon} size={20}/>
          </TouchableHighlight>
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
    height: 150,
    marginBottom:10,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 10,
    justifyContent:'space-between',
    alignItems:'center'
  },
  details:{
    width:(size.width - 40 )/2,
  },
  lbl:{
    marginVertical:3
  },
  titleLbl:{
    fontSize:14,
    alignSelf:'flex-start',
    fontFamily:'Montserrat-Bold',
    color:'#134C83'
  },
  detailLbl:{
    fontSize:10,
    color:'#444'
  },
  distLbl:{
    fontSize:10,
    color:'#444'
  },
  fotos: {
    width:50,
    height:50,
  },
  icon:{
    color:'#134C83'
  },
  logo:{
    resizeMode: 'contain',
    width:(size.width - 40 )/5,
    height:100
  },
  fotoWrap:{
    width:(size.width - 40 )/5,
    alignItems:'center'
  },
  phoneIcon: {
    marginTop:20
  }
});

export default ServicoListItem;