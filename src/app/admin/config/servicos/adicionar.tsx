import SearchInput from '@src/components/forms/search-input'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import Button from '@src/components/button'
import { Container } from '@src/components/container'
import { services } from '@src/configs/types/services'

export default function AdminAddServiceScreen() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selecteds, setSelecteds] = useState<string[] | undefined>(undefined)

  const professionalServices = [
    { name: 'TESTE', id: '1' },
    { name: 'Corte de cabelo', id: '2' },
    { name: 'TESTE', id: '3' },
    { name: 'Corte de cabelo', id: '4' }
  ]

  const onPressItem = (item: string) => {
    if (selecteds?.includes(item)) {
      return setSelecteds(selecteds?.filter((selected) => selected !== item))
    }

    return setSelecteds(selecteds?.concat(item))
  }

  useEffect(() => {
    if (!selecteds) {
      setSelecteds(professionalServices.map((item) => item.id))
    }
  }, [selecteds, setSelecteds, professionalServices])

  const leftIcon = (item: string) => {
    if (selecteds?.includes(item)) {
      return require('@src/assets/images/icons/checked.png')
    }

    return require('@src/assets/images/icons/add.png')
  }

  const onPressAddService = () => {}

  return (
    <Container>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.list}>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.name}
              key={item.id}
              image={item.icon}
              searchTerm={searchTerm}
              onPress={() => onPressItem(item.id)}
              leftIcon={leftIcon(item.id)}
            />
          )}
        />
      </View>
      {selecteds?.length && (
        <View style={styles.button_container}>
          <Button
            text="Adicionar serviços"
            uppercase
            onPress={onPressAddService}
          />
        </View>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: theme.sizes.small,
    marginBottom: theme.sizes.semi,
    backgroundColor: theme.colors.light,
    padding: theme.sizes.small,
    borderRadius: 10,
    flex: 1
  },
  button_container: {
    flexDirection: 'row',
    marginTop: theme.sizes.small,
    justifyContent: 'flex-end'
  }
})
