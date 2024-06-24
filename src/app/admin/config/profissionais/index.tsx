import React, { useState } from 'react'
import { View, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { Link } from 'expo-router'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { CustomModal } from '@src/components/custom-modal'
import Button from '@src/components/button'

export default function AdminConfigProfessionalsScreen() {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const professionals = [
    {
      nome: 'Teste Sobrenome',
      id: 1
    },
    {
      nome: 'Teste Sobrenome',
      id: 2
    },
    {
      nome: 'Teste Sobrenome',
      id: 3
    },
    {
      nome: 'Teste Sobrenome',
      id: 4
    },
    {
      nome: 'Teste Sobrenome',
      id: 5
    },
    {
      nome: 'Teste Sobrenome',
      id: 6
    },
    {
      nome: 'Teste Sobrenome',
      id: 7
    },
    {
      nome: 'Teste Sobrenome',
      id: 8
    }
  ]

  const onRemoveProfessional = () => {
    setOpenConfirmModal(true)
  }

  return (
    <Container>
      <CustomModal open={openConfirmModal} setOpenModal={setOpenConfirmModal}>
        <CustomText text="Deseja remover o profissional?" type="title" />
        <View style={{ flexDirection: 'row', gap: theme.sizes.tiny }}>
          <Button
            text="Sim"
            uppercase
            onPress={() => {}}
            additionalStyle={{
              button: { marginTop: theme.sizes.small, flex: 1 }
            }}
          />
          <Button
            text="Não"
            uppercase
            onPress={() => {
              setOpenConfirmModal(false)
            }}
            additionalStyle={{
              button: { marginTop: theme.sizes.small, flex: 1 }
            }}
          />
        </View>
      </CustomModal>
      <CustomText
        text="Confira os seus profissionais na lista abaixo"
        type="subtitle"
        textAlign="left"
      />
      <View style={styles.list}>
        <FlatList
          data={professionals}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.item}>
              <CustomText type="content" text={item.nome} />
              <View style={styles.options}>
                <Link
                  href={{
                    pathname: routes.ADMIN_EDIT_PROFESSIONAL,
                    params: { id: 'item.id' }
                  }}>
                  <Image
                    source={require('@src/assets/images/icons/edit.png')}
                  />
                </Link>
                <Pressable onPress={onRemoveProfessional}>
                  <Image
                    source={require('@src/assets/images/icons/close.png')}
                  />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
      <ListItemPressable
        label="Adicionar novo profissional"
        url={routes.ADMIN_ADD_PROFESSIONAL}
        leftIcon={require('@src/assets/images/icons/add.png')}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.light,
    paddingHorizontal: theme.sizes.small,
    paddingBottom: theme.sizes.small,
    borderRadius: theme.sizes.tiny,
    marginBottom: theme.sizes.tiny,
    maxHeight: '50%',
    marginTop: theme.sizes.small
  },
  item: {
    backgroundColor: theme.colors.secondary,
    marginTop: theme.sizes.small,
    paddingVertical: theme.sizes.small,
    paddingHorizontal: theme.sizes.small,
    borderRadius: theme.sizes.tiny,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    gap: theme.sizes.small
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.sizes.tiny
  }
})
