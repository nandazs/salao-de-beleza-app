import SearchInput from '@src/components/forms/search-input'
import ListItem from '@src/components/lists/list-item'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

export default function HorariosPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const horarios = [{ horario: '09:30', id: '1' }]

  return (
    <View style={styles.horarios_container}>
      <CustomText
        text="Escolha qual horário fica melhor para você"
        type="subtitle"
        textAlign="center"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.horarios_listContainer}>
        <FlatList
          data={horarios}
          renderItem={({ item }) => (
            <ListItem
              label={item.horario}
              id={item.id}
              searchTerm={searchTerm}
              url="/cliente/agendar/confirmacao"
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  horarios_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.small,
    paddingBottom: theme.sizes.semi
  },
  horarios_listContainer: {
    marginTop: theme.sizes.small
  }
})
