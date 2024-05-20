import {useState} from 'react';
import { 
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Linking,
} from "react-native";
import MiniLogo from "./MiniLogo";
import Modal from './Modal';
import Icon from "./Icon";
import { faCircleUser, faCommentAlt, faMousePointer, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Label from './Label';


const Header = ({navigation}) => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <View style={styles.header}>
        <TouchableHighlight underlayColor='#fafafa' 
            onPress={async () => setModalActive(true)}>
          <MiniLogo />
        </TouchableHighlight>

        <TouchableHighlight underlayColor='#fafafa' onPress={() => navigation.navigate('profile')}>
          <Icon icon={faCircleUser} style={styles.hIcon}/>
        </TouchableHighlight>
      </View>

      <Modal isActive={modalActive} onClose={() => setModalActive(!modalActive)} content={
        <View>
          <TouchableHighlight underlayColor='#fafafa' 
              onPress={async () => await Linking.openURL('https://www.kepecas.com.br/')}>
            <View style={styles.modalOption}>
              <Icon icon={faMousePointer} size={25} style={styles.mIcon}/>
              <Label value='Acesse nosso site!'/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight underlayColor='#fafafa' 
              onPress={async () => await Linking.openURL('https://wa.me/5541988996075/?text=Olá!%20Tenho%20o%20clube%20e%20quero%20um%20atendimento%20personalizado.%20Pode%20me%20ajudar?')}>
            <View style={styles.modalOption}>
              <Icon icon={faCommentAlt} size={25} style={styles.mIcon}/>
              <Label value='Fale com a gente pelo whatsapp!'/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight underlayColor='#fafafa' 
              onPress={async () => await Linking.openURL('https://www.instagram.com/kepecasautopecas/')}>
            <View style={styles.modalOption}>
              <Icon icon={faPaperPlane} size={25} style={styles.mIcon}/>
              <Label value='Siga nosso insta @kepecasautopecas'/>
            </View>
          </TouchableHighlight>
        </View>
      }/>
    </>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fafafa',
    marginTop:30
  },
  hIcon: {
    color:'#134C83',
  },
  mIcon:{
    color:'#134C83',
    marginHorizontal:20
  },
  modalOption:{
    flexDirection:'row',
    marginVertical:10
  },
});

export default Header;