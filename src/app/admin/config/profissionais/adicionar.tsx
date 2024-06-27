import CustomText from '@src/components/text/custom-text'
import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import Button from '@src/components/button'
import { useForm } from 'react-hook-form'
import { CustomTextInput } from '@src/components/forms/custom-text-input'
import { Container } from '@src/components/container'
import { useRegisterProfessional } from '@src/services/hooks'
import { routes } from '@src/configs/types/routes'
import { useRouter } from 'expo-router'
import { services } from '@src/configs/types/services'
import { useAppContext } from '@src/state/hooks'

interface FormData {
  name: string
  services: string[]
}

export default function AdminAddProfessionalScreen() {
  const register = useRegisterProfessional()
  const router = useRouter()
  const { salonId } = useAppContext()

  const filteredServices = services.filter(
    (item, index) => services[index]?.id === item.id
  )

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ defaultValues: { name: '', services: [] } })

  const [selecteds, setSelecteds] = useState<string[]>([])

  const onPressItem = (id: string) => {
    if (selecteds.includes(id)) {
      return setSelecteds(selecteds.filter((selected) => selected !== id))
    }

    return setSelecteds(selecteds.concat(id))
  }

  const leftIcon = (id: string) => {
    if (selecteds.includes(id)) {
      return require('@src/assets/images/icons/checked.png')
    }

    return require('@src/assets/images/icons/add.png')
  }

  const onAddProfessional = (data: FormData) => {
    const professional = {
      name: data.name,
      salon: salonId,
      services: selecteds
    }

    register.mutate(professional, {
      onSuccess: () => router.push(routes.ADMIN_PROFESSIONALS)
    })
  }

  return (
    <>
      <Container additionalStyle={styles.container}>
        <CustomTextInput
          control={control}
          error={errors.name}
          name="name"
          label="Nome"
          placeholder="Digite o nome do(a) profissional"
        />

        <View style={styles.select_service}>
          <CustomText text="Selecionar serviços" textAlign="left" />
          <View style={styles.list}>
            <FlatList
              data={filteredServices}
              renderItem={({ item }) => (
                <ListItemPressable
                  label={item.name}
                  key={item.id}
                  image={item.icon}
                  onPress={() => onPressItem(item.id)}
                  leftIcon={leftIcon(item.id)}
                />
              )}
            />
          </View>
          <View style={styles.button_container}>
            <Button
              text="Adicionar"
              uppercase
              onPress={handleSubmit(onAddProfessional)}
              additionalStyle={{ button: styles.button }}
            />
          </View>
        </View>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.standard,
    paddingBottom: theme.sizes.semi,
    gap: theme.sizes.small
  },
  select_service: {
    marginBottom: theme.sizes.small,
    marginTop: theme.sizes.standard
  },
  list: {
    marginTop: theme.sizes.small,
    marginBottom: theme.sizes.semi,
    backgroundColor: 'white',
    padding: theme.sizes.small,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: theme.colors.secondary,
    maxHeight: '60%'
  },
  button_container: {
    alignItems: 'flex-end'
  },
  button: {
    marginTop: theme.sizes.tiny,
    paddingHorizontal: theme.sizes.semi
  }
})
