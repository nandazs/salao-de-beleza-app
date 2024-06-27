import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Alert, Modal, StyleSheet, View } from 'react-native'

interface CustomModalProps {
  open: boolean
  children: ReactNode
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const CustomModal = ({
  children,
  open,
  setOpenModal
}: CustomModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setOpenModal(!open)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
