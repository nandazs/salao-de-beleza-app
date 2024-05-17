import SearchInput from '@src/components/forms/search-input'
import CustomText from '@src/components/text/custom-text'
import React, { useState } from 'react'
import { View, ImageSourcePropType, StyleSheet, FlatList } from 'react-native'
import ListItem from '@src/components/lists/list-item'
import { theme } from '@src/configs/theme'

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

export default function ServicosPage() {
  const services2 = [
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
    <View style={styles.services_container}>
      <CustomText
        text="Escolha qual serviço deseja fazer"
        type="subtitle"
        textAlign="center"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.services_listContainer}>
        <FlatList
          data={services2}
          renderItem={({ item }) => (
            <ListItem
              label={item.title}
              id={item.id}
              image={icons[item.id]}
              searchTerm={searchTerm}
              url="/cliente/agendar/profissionais"
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  services_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.small,
    paddingBottom: theme.sizes.semi
  },
  services_listContainer: {
    marginTop: theme.sizes.small
  }
})
