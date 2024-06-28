import SearchInput from '@src/components/forms/search-input'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import Button from '@src/components/button'
import { Container } from '@src/components/container'
import { services } from '@src/configs/types/services'
import { useAppContext } from '@src/state/hooks'
import { useUpdateProfessionalServices } from '@src/services/hooks'
import { useRouter } from 'expo-router'
import { routes } from '@src/configs/types/routes'

interface Item {
  id: string
  name: string
  icon: string
}

export default function AdminEditProfessionalServices() {
  const { selectedProfessionalToEdit, setSelectedProfessionalToEdit } =
    useAppContext()
  const updateProfessionalServices = useUpdateProfessionalServices()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [initialSelecteds, setInitialSelecteds] = useState<Item[]>([])
  const [selecteds, setSelecteds] = useState<Item[]>([])

  const filteredServices = services.filter(
    (item, index) =>
      selectedProfessionalToEdit?.services?.[index] === item.id ||
      selectedProfessionalToEdit?.services?.[index] === 'CORTE_CABELO' // apenas teste - um usuario tá cadastrado com o servico assim
  )

  useEffect(() => {
    if (filteredServices) {
      setInitialSelecteds(filteredServices)
    }
  }, [selectedProfessionalToEdit])

  const onPressItem = (item: Item) => {
    if (initialSelecteds.includes(item)) {
      setInitialSelecteds(
        initialSelecteds.filter((selected) => selected.id !== item.id)
      )
    }

    if (selecteds.includes(item)) {
      return setSelecteds(
        selecteds.filter((selected) => selected.id !== item.id)
      )
    }

    return setSelecteds(selecteds.concat(item))
  }

  const leftIcon = (item: Item) => {
    const itemIsSelected =
      initialSelecteds.includes(item) && selecteds.includes(item)

    if (itemIsSelected) {
      return require('@src/assets/images/icons/add.png')
    }

    if (initialSelecteds.includes(item) || selecteds.includes(item)) {
      return require('@src/assets/images/icons/checked.png')
    }

    return require('@src/assets/images/icons/add.png')
  }

  const onPressSave = () => {
    updateProfessionalServices.mutate(
      {
        professionalId: selectedProfessionalToEdit?.professionalId,
        services: initialSelecteds
          .concat(selecteds)
          .map((service) => service.id)
      },
      {
        onSuccess: () => {
          setSelectedProfessionalToEdit(undefined)
          router.push(routes.ADMIN_HOME)
        }
      }
    )
  }

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
              onPress={() => onPressItem(item)}
              leftIcon={leftIcon(item)}
            />
          )}
        />
      </View>
      {selecteds.length && (
        <View style={styles.button_container}>
          <Button text="Salvar mudanças" uppercase onPress={onPressSave} />
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
    maxHeight: '50%'
  },
  button_container: {
    flexDirection: 'row',
    marginTop: theme.sizes.small,
    justifyContent: 'flex-end'
  }
})
