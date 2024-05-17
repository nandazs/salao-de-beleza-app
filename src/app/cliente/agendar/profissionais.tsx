import SearchInput from '@src/components/forms/search-input'
import ListItem from '@src/components/lists/list-item'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

export default function ProfissionaisPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const profissionais = [
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
    <View style={styles.profissionais_container}>
      <CustomText
        text="Escolha por qual profissional deseja ser atendido(a)"
        type="subtitle"
        textAlign="center"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.profissionais_listContainer}>
        <FlatList
          data={profissionais}
          renderItem={({ item }) => (
            <ListItem
              label={item.nome}
              id={item.id}
              image={item.image}
              searchTerm={searchTerm}
              imageStyle={{
                height: theme.sizes.largeX,
                width: theme.sizes.largeX
              }}
              url="/cliente/agendar/horarios"
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profissionais_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.small,
    paddingBottom: theme.sizes.semi
  },
  profissionais_listContainer: {
    marginTop: theme.sizes.small
  }
})
