import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ModalComp from './ModalComp'

const reasons = [
  'Inappropriate Content',
  'Copyright Violation',
  'Incorrect / Misleading Content',
  'Spam / irrelevant File',
];

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: () => void;
}

export default function DeleteModal({ isOpen, onRequestClose, onSubmit }: Props) {

  const handleDelete = () => {
    onSubmit();
    onRequestClose();
  }

  return (
    <ModalComp isOpen={isOpen} onRequestClose={onRequestClose} containerStyle={styles.containerStyle}>
      <Text style={{fontFamily: 'PlayfairDisplay_700Bold', fontSize: 17}}>Delete Post</Text>
      <Text>Are you sure you want to delete this post?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onRequestClose}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.reportButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    </ModalComp>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 116,
    padding: 8,
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  cancelButton: {
    width: 116,
    padding: 8,
    backgroundColor: '#12CE90',
    borderRadius: 100,
  },
  reportButton: {
    width: 116,
    padding: 8,
    backgroundColor: '#7CA8F8',
    borderRadius: 100,
  }
})