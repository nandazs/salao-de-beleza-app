import { Container } from '@src/components/container'
import SearchInput from '@src/components/forms/search-input'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

export default function ClientScheduleProfessionalScreen() {
  const [searchTerm, setSearchTerm] = useState('')

  const professionals = [
    {
      nome: 'Teste',
      id: '1',
      image: require('@src/assets/images/icons/arrow-left.png')
    },
    {
      nome: 'FERNANDA',
      id: '2',
      image: require('@src/assets/images/icons/arrow-left.png')
    },
    {
      nome: 'Teste',
      id: '3',
      image: require('@src/assets/images/icons/arrow-left.png')
    },
    {
      nome: 'Teste',
      id: '4',
      image: require('@src/assets/images/icons/arrow-left.png')
    }
  ]

  return (
    <Container>
      <CustomText
        text="Escolha por qual profissional deseja ser atendido(a)"
        type="subtitle"
        textAlign="center"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.list}>
        <FlatList
          data={professionals}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.nome}
              key={item.id}
              image={item.image}
              searchTerm={searchTerm}
              imageStyle={{
                height: theme.sizes.largeX,
                width: theme.sizes.largeX
              }}
              url={routes.CLIENT_SCHEDULE_TIME}
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
