import { StyleSheet, Text, View, Image, ViewProps } from 'react-native'

export default function LogoWithIcon({ ...props }: ViewProps) {
  return (
    <View style={[styles.container, props.style]} {...props}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.icon}
      />
      <Text style={styles.text}>StudyShare</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  icon: {

  },
  text: {
    color: '#7CA8F8',
    fontFamily: 'PlayfairExtraBold',
    fontSize: 24,
    textAlign: 'center',
  },
})