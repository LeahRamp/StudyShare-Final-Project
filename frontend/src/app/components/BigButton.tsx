import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, PressableProps } from 'react-native'

interface Props extends PressableProps {
  text?: string;
}

export default function BigButton({ text, ...props }: Props) {
  const [pressed, setPressed] = useState(false)

  return (
    <Pressable
      style={[styles.button, pressed && styles.buttonPressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  button: {
    width: 204,
    height: 58,
    borderRadius: 204,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CA8F8',
  },
  buttonPressed: {
    backgroundColor: '#507ed3',
    transform: [{ scale: 0.95}],
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
})