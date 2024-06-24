import React from 'react'
import { View, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import { theme } from '@src/configs/theme'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'

export default function AdminProfessionalTimesScreen() {
  const professionals = [
    {
      nome: '09:30',
      id: 1
    },
    {
      nome: '10:00',
      id: 1
    },
    {
      nome: '14:00',
      id: 1
    }
  ]

  const onRemoveProfessional = () => {
    // abre modal pra confirmar remocao
  }

  return (
    <Container>
      <View style={styles.list}>
        <FlatList
          data={professionals}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.item}>
              <CustomText type="content" text={item.nome} />
              <View style={styles.options}>
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
      {/*INPUT DE ADD HORARIO AQUi
        DAI VC ADD E ADICIONA NO INICIO DA LISTA
      */}
    </Container>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.small,
    paddingBottom: theme.sizes.semi
  },
  item: {
    backgroundColor: theme.colors.secondary,
    marginTop: theme.sizes.small,
    paddingVertical: theme.sizes.small,
    paddingHorizontal: theme.sizes.small,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: theme.sizes.small
  },
  customButtons: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#B529A7'
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.sizes.tiny
  }
})
