import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableNativeFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoWithIcon from '../components/LogoWithIcon';
import InputBox from '../components/InputBox';
import BigButton from '../components/BigButton';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function getErrorMessages(data: any) {
  if (!data) return ['Unknown Error'];
  return Object.values(data)
    .flatMap(val => Array.isArray(val) ? val : [String(val)]);
}

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [errorMessages, setErrorMessages] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSignIn = async () => {
    setErrorMessages('');
    try {
      await signIn(form.email, form.password)
    } catch (error) {
      const message = getErrorMessages(error.response?.data)
      setErrorMessages(message.join('\n'));
      console.log('sign in screen',errorMessages)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <LogoWithIcon />
          <View style={styles.inputs}>
            <InputBox
              ref={emailRef}
              type='email'
              returnKeyType='next'
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value})}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <InputBox
              ref={passwordRef}
              type='password'
              returnKeyType='done'
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value})}
              onSubmitEditing={handleSignIn}
            />
          </View>
          <BigButton text='Login' onPress={handleSignIn} />
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
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