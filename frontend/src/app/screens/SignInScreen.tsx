import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoWithIcon from '../components/LogoWithIcon';
import InputBox from '../components/InputBox';
import BigButton from '../components/BigButton';
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSignIn = async () => {
    setErrorMessage('');
    try {
      await signIn(form.email, form.password);
    } catch (error) {
      setErrorMessage(error.message || "Unknown Error");
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
              <Text style={styles.error}>{errorMessage}</Text>
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
  error: {
    color: '#f00',
    textAlign: 'center',
  },
  inputs: {
    marginTop: 16,
    marginBottom: 40,
    gap: 8,
  },
})