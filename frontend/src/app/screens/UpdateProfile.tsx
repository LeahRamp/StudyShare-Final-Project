import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../components/InputBox';
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { updateUserApi } from '../../services/api/auth';

export default function UpdateProfile() {
  const navigation = useNavigation<any>();
  const { user, updateUser } = useAuth();

  const displayNameRef = useRef<TextInput>(null);
  const profileDescriptionRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    display_name: user.display_name,
    profile_description: user.profile_description || '',
    profile_picture: user.profile_picture,
  })
  const [errorMessage, setErrorMessage] = useState<{ [key: string]:string }>({});

  const handleSave = async () => {
    try {
      await updateUserApi(form);
      updateUser();
      navigation.goBack();
    } catch (error) {
      setErrorMessage(error.fieldErrors || '');
      console.log(error.fieldErrors, 'failed to update profile');
    }
  };
  
  const handlePfpChange = async () => {
    try {
      const permission = await requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Permission to access media library is required.");
        return;
      }
      
      const result = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) return;

      setForm({ ...form, profile_picture: result.assets[0].uri});
    } catch (error) {
      console.log(error.message || "Unknown Error");
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}><Text style={[styles.headerText, styles.cancel]}>Cancel</Text></Pressable>
            <Text style={styles.headerText}>Update Profile</Text>
            <Pressable onPress={handleSave}><Text style={[styles.headerText, styles.save]}>Save</Text></Pressable>
          </View>
          <View style={styles.inputs}>
            <Pressable onPress={handlePfpChange} style={{ width: 80, height: 80}}>
              <Image
                style={styles.profileImage}
                source={{ uri: form.profile_picture }}
              />
            </Pressable>
            <InputBox
              ref={displayNameRef}
              placeholder='Display Name'
              value={form.display_name}
              onChangeText={(value) => setForm({ ...form, display_name: value})}
              onSubmitEditing={() => profileDescriptionRef.current?.focus()}
              error={errorMessage.display_name}
            />
            <InputBox
              ref={profileDescriptionRef}
              multiline
              placeholder='Profile Description'
              value={form.profile_description}
              onChangeText={(value) => setForm({ ...form, profile_description: value})}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
  },
  headerText: {
    padding: 8,
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    fontSize: 16,
  },
  cancel: {color: '#ff5656'},
  save: {color: '#FBAC74'},
  inputs: {
    padding: 16,
    marginTop: 16,
    marginBottom: 40,
    gap: 8,
  },
    profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e4e4e4',
    marginBottom: 12,
  },
})