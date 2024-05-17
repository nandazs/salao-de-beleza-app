import CustomText from '@src/components/text/custom-text'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '@src/configs/theme'

export default function ClientePage() {
  return (
    <View style={styles.client_container}>
      <CustomText
        text="BEM-VINDA" // add validacao de genero?
        type="title"
        textAlign="left"
        textTransform="uppercase"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  client_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.small,
    paddingBottom: theme.sizes.semi
  }
})
