import React, {useState, useEffect} from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
} from "react-native";
import Button2 from "../../components/Button2";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Label from "../../components/Label";
import logo from '../../assets/img/logo_menor.png';
import { get } from '../../Service/Rest/RestService';
import CacheService from '../../Service/Cache/CacheService';


const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    get('/user').then(response => {
      if(response.status === 200)
        setUser(response.data);
    })
    .catch(err => console.log(err));
  }

  const getPosts = () => {
    let posts = [];

    for(let i = 0; i < 13; i++){
      posts.push(<ImageBackground key={i + i} source={/*user.posts[0]*/logo} 
                    style={styles.postImage}
                    resizeMode='contain'/>);
    }
    
    return posts;
  }

  const handleSignOut = () => {
    CacheService.wipe('@jwt')
    .then(() => navigation.navigate('welcome'))
    .catch(err => {console.log(err); navigation.navigate('welcome');});
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        <ScrollView style={styles.content}>
          <View style={styles.profileCardWrap}>
            <ImageBackground source={user?.foto && user?.foto != null ? user?.foto : logo} 
                style={styles.profileImage}
                resizeMode='contain'/>

            <Label value={user?.name} style={styles.profileName}/>

            <Label value={`${user?.email}\n${user?.login} - ${user?.phone}`} 
                style={styles.profileDesc}/>
          
            <Button2 label={'Sair'} style={styles.blockBtn} action={() => handleSignOut()}/>
          </View>

          {/* <View style={styles.postsWrap}>
            {getPosts()}
          </View> */}
        </ScrollView>

        <Footer navigation={navigation} 
            selected={user && user !== null ? "feed" : 'profile'}/>
      </View>
    </>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fafafa',
    width:size.width,
    height:size.height,
    paddingHorizontal:20,
  },
  content:{
    marginTop: 40,
    marginBottom: 150,
    height:size.height - 200
  },
  profileCardWrap:{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    width: size.width - 40,
    height: size.height / 3,
    backgroundColor: '#134C83',
    justifyContent:'center',
    alignItems:'center',
    padding:10,
  },
  profileImage: {
    width:100,
    height: 100,
    backgroundColor:'#fafafa',
    borderRadius:100
  },
  profileName: {
    fontFamily:'Montserrat-Bold',
    fontSize:18,
    color:'#fafafa',
    marginVertical:10,
  },
  profileDesc: {
    fontSize:14,
    color:'#fafafa',
    textAlign:'center'
  },
  blockBtn:{
    width: size.width - 80,
    marginTop: 20
  },
  postsWrap:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'flex-start'
  },
  postImage: {
    height:100,
    width:(size.width - 52) / 3,
    margin:2,
  },
});

export default ProfileScreen;