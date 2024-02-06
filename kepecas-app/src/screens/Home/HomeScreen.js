import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Linking,
} from "react-native";
import Icon from "../../components/Icon";
import Label from "../../components/Label";
import { faCartFlatbed, faShop } from '@fortawesome/free-solid-svg-icons'
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import mobileAds, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const HomeScreen = ({navigation}) => {

  mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,
    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,
    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  });

  const adapterStatuses = mobileAds().initialize();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720~4910331381';

  return (
    <View style={styles.wrap}>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrapPadding}>
        <Header navigation={navigation}/>

        <View style={styles.content}>
          <Label value='Seu consultor automotivo de bolso!'
              style={styles.title}/>

          <Label value='Consulte peças e serviços parceiros'
              style={styles.subtitle}/>

          <View style={styles.cardsWrap}>
            <Card action={async () => await Linking.openURL('https://www.kepecas.com.br/')}
                style={styles.cardP} content={
                  <View style={styles.cardContent}>
                    <Icon style={styles.cardPIcon} size={52} icon={faCartFlatbed}/>

                    <View>
                      <Label value={`Buscar por peças `} style={styles.cardLbl}/>
                    </View>
                  </View>
            }/>

            <Card action={() => navigation.navigate('search')}
                style={styles.cardS} content={
                  <View style={styles.cardContent}>
                    <Icon style={styles.cardSIcon} size={50} icon={faShop}/>

                    <Label value='Buscar por serviços' style={styles.cardLbl}/>
                  </View>
            }/>
                
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
    </View>
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
  subtitle:{
    fontSize:15,
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
    height:120
  },
  cardAdContent:{
    margin:20,
    alignItems:'center'
  },
  cardPIcon: {
    color:'#fafafa',
    transform: [{rotate:'20deg'}],
    marginRight: 20,
  },
  cardSIcon: {
    color:'#fafafa',
    transform: [{rotate:'-20deg'}],
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
});

export default HomeScreen;