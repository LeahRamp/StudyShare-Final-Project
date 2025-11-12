import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LogoWithIcon from '../components/LogoWithIcon'
import BigButton from '../components/BigButton'

export default function SplashScreen () {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <LogoWithIcon style={styles.logo} />
      <BigButton text='Login' onPress={() => navigation.navigate('SignIn')} />
      <BigButton text='Register' onPress={()  => navigation.navigate('SignUp')} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginBottom: 32,
  },
})