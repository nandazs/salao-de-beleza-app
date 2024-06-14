import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'

export default function AdminRegisterProfessionalScreen() {
  const opcoes = [
    {
      nome: 'Adicionar',
      url: routes.ADMIN_ADD_PROFESSIONAL,
      icon: require('@src/assets/images/icons/add.png')
    },
    {
      nome: 'Remover',
      url: routes.ADMIN_REMOVE_PROFESSIONAL,
      icon: require('@src/assets/images/icons/close.png')
    }
  ]

  return (
    <Container>
      <View style={styles.list}>
        <FlatList
          data={opcoes}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.nome}
              url={item.url}
              key={item.nome}
              leftIcon={item.icon}
            />
          )}
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
