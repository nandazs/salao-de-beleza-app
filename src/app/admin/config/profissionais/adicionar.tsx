import CustomText from '@src/components/text/custom-text'
import React, { useState } from 'react'
import { View, ImageSourcePropType, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import Button from '@src/components/button'
import { useForm } from 'react-hook-form'
import { CustomTextInput } from '@src/components/forms/custom-text-input'
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

export default function AdminAddProfessionalScreen() {
  const professionals = [
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

  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues: { nome: '', servicos: [] } })

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

  const onAddProfessional = () => {}

  return (
    <>
      <Container additionalStyle={styles.container}>
        <CustomTextInput
          control={control}
          error={errors.nome}
          name="nome"
          label="Nome"
          placeholder="Digite o nome do(a) profissional"
        />

        <View style={styles.select_service}>
          <CustomText text="Selecionar serviços" textAlign="left" />
          <View style={styles.list}>
            <FlatList
              data={professionals}
              renderItem={({ item }) => (
                <ListItemPressable
                  label={item.title}
                  key={item.id}
                  image={icons[item.id]}
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
              onPress={onAddProfessional}
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
