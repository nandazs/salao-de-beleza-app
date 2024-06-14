import React from 'react'
import { FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'

export default function AdminConfigurationsScreen() {
  const opcoes = [
    { nome: 'Serviços', url: routes.ADMIN_REGISTER_SERVICE },
    { nome: 'Profissionais', url: routes.ADMIN_REGISTER_PROFESSIONAL },
    { nome: 'Horários', url: routes.ADMIN_REGISTER_TIME }
  ]

  return (
    <Container>
      <FlatList
        data={opcoes}
        renderItem={({ item }) => (
          <ListItemPressable label={item.nome} url={item.url} key={item.nome} />
        )}
      />
    </Container>
  )
}
