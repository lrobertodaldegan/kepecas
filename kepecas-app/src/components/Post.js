import { faCircleUser, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import Icon from './Icon';
import Label from './Label';
import logo from '../assets/img/logo_menor.png';

const Post = ({navigation, post}) => {
  
  return (
    <View style={styles.wrap}>
      <ImageBackground source={/*post.foto*/logo} style={styles.image}
          resizeMode='contain'>

        <View style={styles.postActions}>
          <TouchableHighlight underlayColor='#fafafa' 
              onPress={() => null}
              style={styles.postAction}>

            <Icon icon={faThumbsUp} size={20} 
                style={[styles.postIcon, 
                        post.liked === true ? styles.postIconSelected : {}]}/>

          </TouchableHighlight>

          <TouchableHighlight underlayColor='#fafafa' 
              onPress={() => navigation.navigate('profile', {userId:post.usuario.id})}
              style={styles.postAction}>

            <View style={styles.postUserWrap}>
              <Icon icon={faCircleUser} size={20} style={styles.postIcon}/>

              <Label value={post.usuario.nome} style={styles.postUserLbl}/>
            </View>

          </TouchableHighlight>
        </View>
      </ImageBackground>

      <Label value={post.texto} style={styles.postText}/>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    marginVertical:10
  },
  image: {
    width:size.width - 40,
    height:size.height / 2.5,
  },
  postActions:{
    marginTop:(size.height / 2.5) - 40,
    height:40,
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.2)'
  },
  postAction:{},
  postIcon:{
    color:'#fafafa',
  },
  postIconSelected:{},
  postUserWrap:{
    flexDirection:'row',
  },
  postUserLbl:{
    color:'#fafafa',
    marginLeft:10,
  },
  postText:{
    alignSelf:'center',
    marginTop: 10,
    marginHorizontal:5
  }
});

export default Post;