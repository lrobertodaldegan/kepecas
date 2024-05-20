import {useState, useEffect} from 'react';
import { faArrowLeftLong, faShop } from "@fortawesome/free-solid-svg-icons";
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  TextInput,
  FlatList,
  PermissionsAndroid,
} from "react-native";
import Icon from "../components/Icon";
import Label from "../components/Label";
import ServicoListItem from '../components/ServicoListItem';
import {get} from '../Service/Rest/RestService';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Loader from '../components/Loader';
import Geolocation from 'react-native-geolocation-service';
import Modal from '../components/Modal';
import Button2 from '../components/Button2';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/6468799913';

const SearchScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState(null);
  const [filter, setFilter] = useState('servicos');
  const [results, setResults] = useState([]);
  const [resultsAux, setResultsAux] = useState([]);
  const [coords, setCoords] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [placa, setPlaca] = useState('');

  useEffect(() => {
    get('/service/partners').then((response) => {      
      if(response.status == 200){
        setResults(response.data);
        setResultsAux(response.data);
      }

      setLoading(false);
    });
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de acesso à localização',
          message: 'Podemos ler sua localização?',
          buttonNeutral: 'Agora não',
          buttonNegative: 'Não',
          buttonPositive: 'Sim',
        },
      );

      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    if(!coords){
      requestLocationPermission().then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setCoords({
                latitude:position.coords.latitude, 
                longitude:position.coords.longitude
              });
            },
            error => {console.log(error.code, error.message);},
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    }
  }, []);

  const renderResults = () => {
    if(loading){
      return <Loader color='#fafafa'/>
    } else {
      return (
        <FlatList 
            style={styles.list}
            data={results}
            keyExtractor={(item) => item.id ? item.id : item._id}
            ListFooterComponent={
              <View style={styles.ad}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.MEDIUM_RECTANGLE}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                />
              </View>
            }
            renderItem={({item}) => {
              // if(filter === 'pecas')
              //   return <PecaListItem item={item}/>
              
              if(filter === 'servicos')
                return <ServicoListItem key={item._id} navigation={navigation} 
                            item={item} coordinates={coords}/>

              // return <UsuarioListItem item={item} 
              //           onPress={() => navigation.navigate('profile', {user:'x'})}/>
            }}
        />
      );
    }
  }

  const handleFilter = (filter) => {    
    if(filter &&filter.length > 2){
      if(results && results.length > 0){
        let filtered = [];

        resultsAux.forEach(r => {
          if(r.name.toLowerCase().includes(filter.toLowerCase()) 
                || r.cat.toLowerCase().includes(filter.toLowerCase())
                || (r.services && r.services !== null && r.services.toLowerCase().includes(filter.toLowerCase()))){
            filtered.push(r);
          }
        });

        setResults(filtered);
      }
    } else {
      setResults(resultsAux);
    }

    setWord(filter);
  }

  const handleModalOn = () => {
    if(!placa || placa.length < 6){
      get('/usercars')
      .then(response => {
        if(response.status === 200){
          if(response.data && response.data[0] && response.data[0].placa)
            setPlaca(response.data[0].placa.toUpperCase());
          else
            setPlaca('AAA0A00');
        }

        setShowModal(true);
      })
      .catch(err => console.log(err));
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#134C83' barStyle='light-content'/>

      <View style={styles.wrap}>
        <View style={styles.searchHeader}>
          <View style={styles.headerTopActions}>
            <TouchableHighlight underlayColor='#134C83' style={styles.gbiWrap}
                onPress={() => navigation.navigate('home')}>
              <Icon icon={faArrowLeftLong} style={styles.goBackIcon}/>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='#134C83'
                onPress={() => handleModalOn()}>
              <Label value='Pesquisar por placa' style={styles.titleTopActions}/>
            </TouchableHighlight>
          </View>

          <Label value='Pesquisar' style={styles.title}/>

          <TextInput style={styles.input} placeholderTextColor='#fafafa' 
              onChangeText={(val) => handleFilter(val)} value={word}
              placeholder='O que procura?'/>
          
          <View style={styles.filters}>
            {/* <TouchableHighlight underlayColor='#fafafa'
                onPress={() => setFilter('pecas')}>

              <View style={[styles.filter, filter === 'pecas' ? styles.filterSelected : {}]}>
                <Icon icon={faCartFlatbed} 
                    style={[styles.filterIcon, filter === 'pecas' ? styles.filterIconSelected : {}]}/>

                <Label value='Peças' 
                    style={[styles.filterLbl, filter === 'pecas' ? styles.filterLblSelected : {}]}/>
              </View>
            </TouchableHighlight> */}

            <TouchableHighlight underlayColor='#fafafa'
                onPress={() => setFilter('servicos')}>

              <View style={[filter === 'servicos' ? styles.filterSelected : {}, styles.filter]}>
                <Icon icon={faShop} 
                    style={[styles.filterIcon, filter === 'servicos' ? styles.filterIconSelected : {}]}/>

                <Label value='Serviços' 
                    style={[styles.filterLbl, filter === 'servicos' ? styles.filterLblSelected : {}]}/>
              </View>
            </TouchableHighlight>

            {/* <TouchableHighlight underlayColor='#fafafa'
                onPress={() => setFilter('usuarios')}>

              <View style={[styles.filter, filter === 'usuarios' ? styles.filterSelected : {}]}>
                <Icon icon={faUser} 
                    style={[styles.filterIcon, filter === 'usuarios' ? styles.filterIconSelected : {}]}/>

                <Label value='Usuários' 
                    style={[styles.filterLbl, filter === 'usuarios' ? styles.filterLblSelected : {}]}/>
              </View>
            </TouchableHighlight> */}
          </View>
        </View>

        {renderResults()}

        {/* <View style={styles.searchPFooter}>
          <TouchableHighlight underlayColor='#fafafa'
              style={styles.searchPFooterBtns}
              onPress={() => null}>
              <Label value='Enviar itens'/>
          </TouchableHighlight>

          <TouchableHighlight underlayColor='#fafafa'
              style={styles.searchPFooterBtns}
              onPress={() => null}>
              <Label value='Exportar PDF'/>
          </TouchableHighlight>
        </View> */}
      </View>

      <Modal isActive={showModal} onClose={() => setShowModal(!showModal)} content={
        <View style={{alignItems:'center'}}>
          <View style={styles.wrapInputPlaca}>
            <View style={styles.topInputPlaca}></View>
            <TextInput style={styles.inputPlaca} placeholderTextColor='#555' 
                onChangeText={(val) => val.length > 7 ? null : setPlaca(val)} value={placa}
                placeholder='AAA0A00'/>
          </View>

          <Button2 label={'Pesquisar para essa placa'} style={styles.modalBtn}
              action={() => setShowModal(false)}/>
        </View>
      }/>
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
  searchHeader:{
    backgroundColor:'#134C83',
    marginBottom:10
  },
  headerTopActions:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  gbiWrap:{
    width:50,
    height:20,
  },
  goBackIcon:{
    color:'#fafafa'
  },
  title:{
    fontFamily:'Montserrat-Bold',
    fontSize:16,
    color:'#fafafa',
    marginTop:30
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

export default SearchScreen;