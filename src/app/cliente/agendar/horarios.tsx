import { Container } from '@src/components/container'
import SearchInput from '@src/components/forms/search-input'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

export default function ClientScheduleTimeScreen() {
  const [searchTerm, setSearchTerm] = useState('')

  const times = [{ horario: '09:30', id: '1' }]

  return (
    <Container>
      <CustomText
        text="Escolha qual horário fica melhor para você"
        type="subtitle"
        textAlign="center"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.list}>
        <FlatList
          data={times}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.horario}
              key={item.id}
              searchTerm={searchTerm}
              url={routes.CLIENT_SCHEDULE_CONFIRM}
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
