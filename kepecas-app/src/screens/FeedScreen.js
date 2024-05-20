import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import logo from '../assets/img/logo_menor.png';

const post = {
  id:0,foto:{logo}, texto:'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste', 
  usuario:{id:'x', nome:'Usuário X'}, liked:true
}

const post2 = {
  id:1,foto:{logo}, texto:'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste', 
  usuario:{id:'x', nome:'Usuário X'}, liked:false
}

const FeedScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        <View style={styles.content}>
          <FlatList 
              style={styles.list}
              data={[post, post2]}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return <Post navigation={navigation} post={item} />
              }}
          />
        </View>

        <Footer navigation={navigation} selected='feed'/>
      </View>
    </>
  );
}

const size = Dimensions.get('screen')

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fafafa',
    width:size.width,
    height:size.height,
    paddingHorizontal:20,
  },
  content:{
    marginTop: 40
  },
  list:{
    height:size.height - 200,
    marginBottom:150
  },
});

export default FeedScreen;