import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ModalComp from './ModalComp'

const reasons = [
  { key: 'inappropriate', label: 'Inappropriate Content' },
  { key: 'copyright', label: 'Copyright Violation' },
  { key: 'misleading', label: 'Incorrect / Misleading Content' },
  { key: 'spam', label: 'Spam / Irrelevant Files' },
];


type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (reason: string) => void;
}

export default function ReportModal({ isOpen, onRequestClose, onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleReport = () => {
    if (selected) {
      onSubmit(selected);
      onRequestClose();
    }
  }

  return (
    <ModalComp isOpen={isOpen} onRequestClose={onRequestClose} containerStyle={styles.containerStyle}>
      <Text style={{fontFamily: 'PlayfairDisplay_700Bold', fontSize: 17}}>Reason for Reporting Post</Text>

      <View style={styles.optionsContainer}>
        {reasons.map((reason) => (
        <TouchableOpacity
          style={styles.option}
          key={reason.key}
          onPress={() => setSelected(reason.key)}
        >
          <View style={[styles.optionIndicator, selected === reason.key && styles.optionSelected]} />
          <Text style={styles.optionText}>{reason.label}</Text>
        </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onRequestClose}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.reportButton]}
          onPress={handleReport}
        >
          <Text style={styles.buttonText}>Report Post</Text>
        </TouchableOpacity>
      </View>
    </ModalComp>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    gap: 20,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIndicator: {
    width: 10,
    height: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  optionSelected: {
    backgroundColor: '#000',
  },
  optionText: {
    fontFamily: 'Inter_400Regular',
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