import {useState, useEffect} from 'react';
import { faArrowLeftLong, faCartFlatbed, faShop, faUser } from "@fortawesome/free-solid-svg-icons";
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import Icon from "../components/Icon";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import ServicoCardItem from '../components/ServicoCardItem';
import Label from '../components/Label';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/6468799913';

const SearchDetailScreen = ({navigation, route}) => {
  const {item, coords} = route.params;

  return (
    <>
      <StatusBar backgroundColor='#134C83' barStyle='light-content'/>

      <View style={styles.wrap}>
        <View style={styles.searchHeader}>
          <View style={styles.headerTopActions}>
            <TouchableHighlight underlayColor='#134C83' style={styles.gbiWrap}
                onPress={() => navigation.goBack()}>
              <Icon icon={faArrowLeftLong} style={styles.goBackIcon}/>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.subWrap}>
          <Label value={'Parceiro do clube'} style={styles.mainTitle}/>

          <ServicoCardItem navigation={navigation} item={item} coordinates={coords}/>

          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>
    </>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#134C83',
    width:size.width,
    height:size.height,
    padding:20,
  },
  gbiWrap:{
    width:50,
    height:20,
  },
  subWrap:{
    alignItems:'center'
  },
  searchHeader:{
    backgroundColor:'#134C83',
    marginBottom:10
  },
  headerTopActions:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  goBackIcon:{
    color:'#fafafa'
  },
  mainTitle:{
    fontFamily:'Montserrat-Bold',
    fontSize:20,
    color:'#fafafa',
  },
  titleTopActions:{
    fontSize:16,
    color:'#fafafa',
    marginTop:0
  },
  input:{
    borderRadius:10,
    height: 50,
    width: size.width - 40,
    marginTop:10,
    backgroundColor:'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Regular',
    color:'#fafafa'
  },
  filters:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10
  },
  filter:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:10,
    paddingHorizontal:15,
    paddingVertical:10,
  },
  filterLbl:{
    color:'#fafafa',
    fontSize:14
  },
  filterIcon:{
    color:'#fafafa',
    marginRight:5
  },
  filterSelected:{
    backgroundColor:'#fafafa',
  },
  filterLblSelected:{
    color:'#134C83',
    fontFamily:'Montserrat-Bold'
  },
  filterIconSelected:{
    color:'#134C83',
  },
  list:{
    marginBottom:120,
  },
  searchPFooter: {
    flexDirection:'row',
    position:'absolute',
    bottom:70,
    paddingHorizontal:20,
    paddingVertical:20,
    width:size.width,
    justifyContent:'space-between',
    backgroundColor:'#134C83',
  },
  searchPFooterBtns: {
    width:(size.width - 60)/2,
    backgroundColor:'#fafafa',
    borderRadius:5,
    alignItems:'center',
    paddingVertical:15
  },
  searchPFooterBtnsLbl:{
    color:'#134C83'
  },
  ad:{
    alignItems:'center',
    marginBottom:10,
    width:size.width - 40,
    backgroundColor:'#fafafa',
    borderRadius:10
  },
  wrapInputPlaca:{
    borderWidth:5,
    borderColor:'#000',
    marginTop:50,
    width:size.width*0.71,
    borderRadius: 10,
    height:100
  },
  inputPlaca:{
    color:'#000',
    fontFamily:'Montserrat-Bold',
    fontSize:30,
    textAlign:'center',
    letterSpacing: 10
  },
  topInputPlaca:{
    backgroundColor:'blue',
    height:30,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    width:size.width*0.685
  },
  modalBtn:{
    width:size.width*0.71,
    marginTop:20
  },
});

export default SearchDetailScreen;