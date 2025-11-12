import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoWithIcon from '../components/LogoWithIcon';
import InputBox from '../components/InputBox';
import BigButton from '../components/BigButton';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';

export default function SignInScreen() {
  const navigation = useNavigation<any>();

  const displayNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
  })



  const handleSignUp = () => {
    console.log(form)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LogoWithIcon />
        <View style={styles.inputs}>
          <InputBox
            ref={displayNameRef}
            placeholder='Display Name'
            returnKeyType='next'
            value={form.displayName}
            onChangeText={(value) => setForm({ ...form, displayName: value })}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <InputBox
            ref={emailRef}
            type='email'
            returnKeyType='next'
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <InputBox
            ref={passwordRef}
            type='password'
            returnKeyType='done'
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            onSubmitEditing={handleSignUp}
          />
        </View>
        <BigButton text='Register' onPress={handleSignUp} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputs: {
    marginTop: 32,
    marginBottom: 40,
    gap: 8,
  },
})