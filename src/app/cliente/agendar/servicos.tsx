import SearchInput from '@src/components/forms/search-input'
import CustomText from '@src/components/text/custom-text'
import React, { useState } from 'react'
import { View, ImageSourcePropType, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'

const icons: { [key: string]: ImageSourcePropType } = {
  '1': require('@src/assets/images/icons/arrow-left.png'),
  '2': require('@src/assets/images/icons/arrow-left.png'),
  '3': require('@src/assets/images/icons/arrow-left.png'),
  '4': require('@src/assets/images/icons/arrow-left.png'),
  '5': require('@src/assets/images/icons/arrow-left.png'),
  '6': require('@src/assets/images/icons/arrow-left.png'),
  '7': require('@src/assets/images/icons/arrow-left.png'),
  '8': require('@src/assets/images/icons/arrow-left.png'),
  '9': require('@src/assets/images/icons/arrow-left.png'),
  '10': require('@src/assets/images/icons/arrow-left.png')
}

export default function ClientScheduleServiceScreen() {
  const services = [
    { title: 'TESTE', id: '1' },
    { title: 'Corte de cabelo', id: '2' },
    { title: 'TESTE', id: '3' },
    { title: 'Corte de cabelo', id: '4' },
    { title: 'TESTE', id: '5' },
    { title: 'Corte de cabelo', id: '6' },
    { title: 'Corte de cabelo', id: '7' }
  ]

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Container>
      <CustomText
        text="Escolha qual serviço deseja fazer"
        type="paragraph"
        textAlign="left"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.list}>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.title}
              key={item.id}
              image={icons[item.id]}
              searchTerm={searchTerm}
              url={routes.CLIENT_SCHEDULE_PROFESSIONAL}
            />
          )}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: theme.sizes.small
  }
})
