import { 
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Icon from "./Icon";
import { faSearch, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import CacheService from "../Service/Cache/CacheService";
import { post } from "../Service/Rest/RestService";
import DeviceInfo from 'react-native-device-info';

const Footer = ({selected='home', navigation}) => {

  let devId = DeviceInfo.getDeviceId();

  const handleHomeNavigation = () => {
    CacheService.get('@jwt').then((jwt) => {
      if(jwt && jwt !== null){
        post('/user/device', {deviceId:devId})
        .then((response) => {
          if(response.status === 200){
            navigation.navigate(
              response.data.user && response.data.user.type === 'partner' 
                ? 'partnerHome' 
                : 'home'
            );
          }
        }).catch((err) => console.log(err));
      }
    });
  }

  return (
    <View style={styles.footer}>
      <TouchableHighlight underlayColor='#fafafa'
          onPress={handleHomeNavigation}
          style={[styles.footerIconWrap, selected === 'home' 
                                                    ? styles.footerIconWrapSelected 
                                                    : {}]}>

        <Icon style={[styles.footerIcon, selected === 'home' 
                                                    ? styles.footerIconSelected
                                                    : {}]} 
            size={22} icon={faWarehouse}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor='#fafafa'
          onPress={() => navigation.navigate('search')}
          style={[styles.footerIconWrap]}>

        <Icon style={styles.footerIcon} size={22} icon={faSearch}/>
      </TouchableHighlight>

      {/*TODO desabilitado por não trabalharmos como rede social ainda
      <TouchableHighlight underlayColor='#fafafa' 
          onPress={() => navigation.navigate('feed')}
          style={[styles.footerIconWrap, selected === 'feed'
                                                    ? styles.footerIconWrapSelected 
                                                    : {} ]}>

        <Icon size={22} icon={faImages} 
            style={[styles.footerIcon, selected === 'feed' 
                                                  ? styles.footerIconSelected 
                                                  : {}]} />
      </TouchableHighlight>
      */}
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  footer:{
    flexDirection:'row',
    position:'absolute',
    bottom:70,
    paddingHorizontal:100,/*50 para 3 opções, 100 para 2 */
    paddingVertical:20,
    width:size.width,
    justifyContent:'space-between',
    backgroundColor:'#fafafa',
  },
  footerIconWrap:{
    borderRadius:5,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center'
  },
  footerIconWrapSelected:{
    backgroundColor:'#134C83'
  },
  footerIcon:{
    color:'#134C83'
  },
  footerIconSelected:{
    color:'#fafafa'
  },
});

export default Footer;