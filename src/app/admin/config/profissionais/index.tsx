import React, { useState } from 'react'
import { View, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { CustomModal } from '@src/components/custom-modal'
import Button from '@src/components/button'
import {
  useDeleteProfessional,
  useGetProfessionalsBySalon
} from '@src/services/hooks'
import { useAppContext } from '@src/state/hooks'
import { Professional } from '@src/services/types'
import { useRouter } from 'expo-router'

export default function AdminConfigProfessionalsScreen() {
  const { salonId } = useAppContext()
  const router = useRouter()
  const deleteProfessional = useDeleteProfessional()
  const [professionalToDelete, setProfessionalToDelete] = useState<string>('')

  if (!salonId) {
    return null
  }

  const { data } = useGetProfessionalsBySalon(salonId)

  const { setSelectedProfessionalToEdit } = useAppContext()

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)

  const removeProfessional = () => {
    deleteProfessional.mutate(professionalToDelete, {
      onSuccess: () => {
        setOpenConfirmModal(false)
      }
    })
  }

  const onRemoveProfessional = (id: string) => {
    setOpenConfirmModal(true)
    setProfessionalToDelete(id)
  }

  const onEditProfessional = (item: Professional) => {
    setSelectedProfessionalToEdit({
      professionalId: item.idFuncionario,
      services: item.servicosPrestados
    })
    router.push(routes.ADMIN_EDIT_PROFESSIONAL)
  }

  return (
    <Container>
      <CustomModal open={openConfirmModal} setOpenModal={setOpenConfirmModal}>
        <CustomText text="Deseja remover o profissional?" type="title" />
        <View style={{ flexDirection: 'row', gap: theme.sizes.tiny }}>
          <Button
            text="Sim"
            uppercase
            onPress={removeProfessional}
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
          data={data}
          renderItem={({ item }) => (
            <View key={item.idFuncionario} style={styles.item}>
              <CustomText type="content" text={item.nomeFuncionario} />
              <View style={styles.options}>
                <Pressable onPress={() => onEditProfessional(item)}>
                  <Image
                    source={require('@src/assets/images/icons/edit.png')}
                  />
                </Pressable>
                <Pressable
                  onPress={() => onRemoveProfessional(item.idFuncionario)}>
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
