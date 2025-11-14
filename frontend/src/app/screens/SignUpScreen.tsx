import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoWithIcon from '../components/LogoWithIcon';
import InputBox from '../components/InputBox';
import BigButton from '../components/BigButton';
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signUp } = useAuth();

  const displayNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
  })
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState('');

  const handleSignUp = async () => {
    setErrorMessages({});
    setGeneralError('');
    try {
      await signUp(form.email, form.password, form.displayName);
    } catch (error) {
      setErrorMessages(error.fieldErrors || {});
      setGeneralError(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LogoWithIcon />
        <View style={styles.inputs}>
          <Text style={styles.error}>{generalError}</Text>
          <InputBox
            ref={displayNameRef}
            placeholder='Display Name'
            returnKeyType='next'
            value={form.displayName}
            onChangeText={(value) => setForm({ ...form, displayName: value })}
            onSubmitEditing={() => emailRef.current?.focus()}
            error={errorMessages.display_name}
          />
          <InputBox
            ref={emailRef}
            type='email'
            returnKeyType='next'
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errorMessages.email}
          />
          <InputBox
            ref={passwordRef}
            type='password'
            returnKeyType='done'
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            onSubmitEditing={handleSignUp}
            error={errorMessages.password}
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
  error: {
    color: '#f00',
    textAlign: 'center',
  },
  inputs: {
    marginTop: 32,
    marginBottom: 40,
    gap: 8,
  },
})