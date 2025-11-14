import { forwardRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface Props extends TextInputProps {
  type?: 'text' | 'email' | 'password';
  error?: string;
}

const InputBox = forwardRef<TextInput, Props>(({ type = 'text', error, ...props }, ref) => {
  const [secure, setSecure] = useState(type === 'password');

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
      <View>
        <TextInput
          ref={ref}
          style={[styles.input, props.style, {borderColor: error ? '#f00' : '#6B7280'}]}
          placeholder={props.placeholder || (type === 'email' ? 'Email' : type === 'password' ? 'Password' : 'Type Here')}
          keyboardType={props.keyboardType || (type === 'email' ? 'email-address' : 'default')}
          autoCapitalize={props.autoCapitalize || (type === 'email' || type === 'password' ? 'none' : 'sentences')}
          autoCorrect={props.autoCorrect || (type === 'password' ? false : true)}
          textContentType={props.textContentType || (type === 'email' ? 'emailAddress' : type === 'password' ? 'password' : 'none')}
          secureTextEntry={secure}
          {...props}
        />
        {type === 'password' && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSecure(!secure)}
          >
            {secure ? <EyeOff size={24} color='#7CA8F8' /> : <Eye size={24} color='#7CA8F8' />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default InputBox;


const styles = StyleSheet.create({
  container: {
    width: 256,
    marginTop: 20,
  },
  error: {
    color: '#f00',
  },
  input: {
    borderBottomWidth: 1,
    paddingRight: 40,
    paddingLeft: 12,
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
});