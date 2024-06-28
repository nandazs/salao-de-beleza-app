import React from 'react'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'

export default function AdminConfigurationsScreen() {
  return (
    <Container>
      <ListItemPressable
        label="Profissionais"
        url={routes.ADMIN_PROFESSIONALS}
      />
    </Container>
  )
}
