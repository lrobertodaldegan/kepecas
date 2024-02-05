import {useState, useEffect} from 'react';
import{
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Linking,
  Image
} from 'react-native';
import { faMapLocation, faPhone } from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import Icon from './Icon';
import {post} from '../Service/Rest/RestService';
import Loader from './Loader';

const ServicoCardItem = ({item, onSelect=() => null, coordinates={}, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if(coordinates && coordinates.longitude && coordinates.latitude){
      if(distance < 1){
        let itemCoord = item && item.coordinates 
                                  ? JSON.parse(item.coordinates)
                                  : null;
        if(itemCoord != null){
          let body = {coords:[coordinates, itemCoord]};

          post('/service/distance', body).then(response => {
            if(response.status != 200)
              setDistance(0);
            else
              setDistance(Math.round(response.data));

            setLoading(false);
          }).catch(err => console.log(err))
        }
      }
    }
  }, []);

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
    let itemCoord = item && item.coordinates 
                                  ? JSON.parse(item.coordinates)
                                  : null;
    if(itemCoord != null){
      const scheme = Platform.select({
                                ios: 'maps://0,0?q=', 
                                android: 'geo:0,0?q=' 
      });

      const latLng = `${itemCoord.latitude},${itemCoord.longitude}`;

      const url = Platform.select({
        ios: `${scheme}${item.name}@${latLng}`,
        android: `${scheme}${latLng}(${item.name})`
      });

      return (
        <TouchableHighlight underlayColor='#fafafa'
            onPress={() => Linking.openURL(url)}>
          <Icon icon={faMapLocation} style={styles.icon} size={30}/>
        </TouchableHighlight>
      )
    } else {
      return <></>
    }
  }

  const renderLogo = () => {
    if(item.logo && item.logo != null){
      return <Image source={{uri: item.logo}} style={styles.logo}/>
    } else {
      return <Icon icon={faShop} style={styles.icon} size={50}/>
    }
  }

  return (
    <View style={styles.wrap}>

      <View style={styles.logoWrap}>
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
        <TouchableHighlight underlayColor='#fafafa'
            onPress={() => Linking.openURL(`tel:${item.phone}`)}>
          <Icon icon={faPhone} style={styles.icon} size={30}/>
        </TouchableHighlight>

        {renderMapLink()}
      </View>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
    backgroundColor:'#fafafa',
    width:size.width - 40,
    minHeight: size.height / 3,
    marginVertical:10,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius: 10,
  },
  logoWrap:{
    marginVertical:20,
  },
  selectBtn:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:(size.width - 40 )/3,
    marginVertical:20
  },
  details:{
    width:(size.width - 40 )/1.5,
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
    fontSize:12,
    color:'#444'
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
  },
  logo:{
    resizeMode: 'contain',
    width:100,
    height:100
  }
});

export default ServicoCardItem;