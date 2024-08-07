import React, {useState, useEffect} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Linking,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from "react-native";
import Icon from "../components/Icon";
import Label from "../components/Label";
import { faMagnifyingGlass, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { get } from '../Service/Rest/RestService';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/6468799913';

const PartnerHomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [qtd, setQtd] = useState(0);
  const [searchTerms, setSearchTerms] = useState([]);

  useEffect(() => {
    if(loading === true){
      get('/service/metrics')
      .then(response => {
        if(response.data && response.data !== null && response.data.length > 0){
          let metrics = response.data[0];

          if(metrics.searchQtd && metrics.searchQtd !== null
                && metrics.terms && metrics.terms !== null){
            setQtd(metrics.searchQtd);
            setSearchTerms(metrics.terms);
          }
        }

        setLoading(false);
      })
      .catch(err => {
        console.log(err);

        ToastAndroid.show('Houve um erro ao obter as métricas!', ToastAndroid.BOTTOM);
      });
    }
  }, [loading]);

  return (
    <ScrollView contentContainerStyle={styles.wrap}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => setLoading(true)} />}>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrapPadding}>
        <Header navigation={navigation}/>

        <View style={styles.content}>
          <Label value='Seu parceiro consultor automotivo!'
              style={styles.title}/>

          <View style={styles.cardsWrap}>
            <Card action={async () => await Linking.openURL('https://www.kepecas.com.br/')}
                style={styles.cardP} content={
                  <View style={styles.cardContent}>
                    <Icon style={styles.cardPIcon} size={52} 
                      icon={faMagnifyingGlassChart}/>

                    <View style={styles.qtdWrap}>
                      <Label 
                        value={`Seus serviços foram listados ${qtd} veze(s)!`} 
                        style={styles.cardLbl}/>
                    </View>
                  </View>
            }/>

            <Card style={styles.cardTerm} 
              content={
                <View style={styles.cardTermContent}>
                  <Icon style={styles.cardSIcon} size={50} 
                    icon={faMagnifyingGlass}/>

                  <View style={[styles.qtdWrap, styles.termWrap]}>
                    <Label 
                      value={`Os serviços mais buscados:`}
                      style={styles.cardLbl}/>

                    <Label 
                      lines={6}
                      value={`${searchTerms}`}
                      style={styles.cardTermsLbl}/>
                  </View>
                </View>
              }
            />
                
          </View>
        </View>
      </View>

      <View style={styles.cardAdContent}>
        <BannerAd
          style={styles.cardAdContent}
          unitId={adUnitId}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>

      <Footer navigation={navigation}/>
    </ScrollView>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fafafa',
    width:size.width,
    height:size.height,
  },
  wrapPadding:{
    paddingHorizontal:20
  },
  content:{
    marginTop: 40
  },
  title: {
    fontSize:18,
    fontFamily:'Montserrat-Bold',
    marginBottom:5
  },
  cardsWrap:{
    marginTop:30
  },
  cardP: {
    backgroundColor:'#134C83',
  },
  cardS: {
    backgroundColor:'#0489CC',
    marginTop:20
  },
  cardAd: {
    backgroundColor:'#fafafa',
    marginTop:20
  },
  cardContent:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    minHeight:120
  },
  cardAdContent:{
    margin:20,
    alignItems:'center'
  },
  cardPIcon: {
    color:'#fafafa',
    marginRight: 20,
  },
  cardSIcon: {
    color:'#fafafa',
    marginRight: 20,
  },
  cardLbl: {
    color:'#fafafa',
    fontSize:18,
    fontFamily:'Montserrat-Bold'
  },
  cardLegend:{
    color:'#fafafa',
    fontSize:12,
  },
  adLbl:{
    color:'#134C83',
    fontFamily:'Montserrat-Bold'
  },
  qtdWrap:{
    width:(size.width - 40) * 0.6
  },
  cardTerm:{
    backgroundColor:'#0489CC',
    marginTop:20,
    height:200
  },
  cardTermContent:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    minHeight:200
  },
  cardTermsLbl:{
    color:'#fafafa',
    fontSize:12
  },
});

export default PartnerHomeScreen;