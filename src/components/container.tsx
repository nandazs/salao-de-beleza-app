import React from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '@src/configs/theme'

export const Container = ({
  children,
  additionalStyle
}: {
  children: React.ReactNode
  additionalStyle?: object
}) => {
  return <View style={[styles.container, additionalStyle]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    paddingTop: theme.sizes.small,
    paddingHorizontal: theme.sizes.standard,
    paddingBottom: theme.sizes.large
  }
})
