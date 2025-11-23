import { ModalProps, Modal, View } from "react-native";

type Props = ModalProps & {
  isOpen: boolean;
  children: React.ReactNode;
  containerStyle?: object;
}

export default function ModalComp({ isOpen, children, containerStyle, ...rest}: Props) {
  return (
    <Modal visible={isOpen} transparent animationType="fade" statusBarTranslucent {...rest}>
      <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, backgroundColor: '#0000006c' }}>
        <View style={[containerStyle, { backgroundColor: '#fff', borderRadius: 24, width: '100%', justifyContent: 'center', padding: 24 }]}>
          {children}
        </View>
      </View>
    </Modal>
  )
}