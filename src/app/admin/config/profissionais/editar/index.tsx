import React from 'react'
import { View, StyleSheet } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'

export default function AdminConfigEditProfessionalScreen() {
  return (
    <Container>
      <View style={styles.list}>
        <ListItemPressable
          label="Serviços"
          url={routes.ADMIN_EDIT_PROFESSIONAL_SERVICES}
          leftIcon={require('@src/assets/images/icons/arrow.png')}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.small,
    paddingBottom: theme.sizes.semi
  }
})
