import SearchInput from '@src/components/forms/search-input'
import CustomText from '@src/components/text/custom-text'
import React, { useState } from 'react'
import { View, ImageSourcePropType, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import Button from '@src/components/button'
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

interface ServicesProps {
  title: string
  id: string
}

export default function AdminRemoveServiceScreen() {
  const services: ServicesProps[] = [
    { title: 'TESTE', id: '1' },
    { title: 'Corte de cabelo', id: '2' },
    { title: 'TESTE', id: '3' },
    { title: 'Corte de cabelo', id: '4' },
    { title: 'TESTE', id: '5' },
    { title: 'Corte de cabelo', id: '6' },
    { title: 'Corte de cabelo', id: '7' },
    { title: 'Corte de cabelo', id: '8' },
    { title: 'Corte de cabelo', id: '9' },
    { title: 'Corte de cabelo', id: '10' },
    { title: 'Corte de cabelo', id: '11' }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [selecteds, setSelecteds] = useState<string[]>([])

  const onPressItem = (item: string) => {
    if (selecteds.includes(item)) {
      return setSelecteds(selecteds.filter((selected) => selected !== item))
    }

    return setSelecteds(selecteds.concat(item))
  }

  const leftIcon = (item: string) => {
    if (selecteds.includes(item)) {
      return require('@src/assets/images/icons/checked.png')
    }

    return require('@src/assets/images/icons/close.png')
  }

  return (
    <Container>
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
              onPress={() => onPressItem(item.id)}
              leftIcon={leftIcon(item.id)}
            />
          )}
        />
      </View>
      {selecteds.length > 0 && (
        <View>
          <CustomText text="Remover serviços" textAlign="left" />
          <View style={styles.button_container}>
            <Button
              text="Não"
              uppercase
              onPress={() => setSelecteds([])}
              additionalStyle={{ button: styles.button }}
            />
            <Button
              text="Sim"
              uppercase
              onPress={() => {}}
              additionalStyle={{ button: styles.button }}
            />
          </View>
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
    gap: theme.sizes.large,
    marginTop: theme.sizes.small
  },
  button: {
    flex: 1
  }
})
