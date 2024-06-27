import SearchInput from '@src/components/forms/search-input'
import CustomText from '@src/components/text/custom-text'
import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Container } from '@src/components/container'
import { useAppContext } from '@src/state/hooks'
import { useRouter } from 'expo-router'
import { services } from '@src/configs/types/services'

export default function ClientScheduleServiceScreen() {
  const { setSchedule, schedule, selectedProfessionalByClient } =
    useAppContext()
  const router = useRouter()

  const filteredServices = services.filter(
    (item, index) =>
      selectedProfessionalByClient?.servicosPrestados[index] === item.id
  )

  const [searchTerm, setSearchTerm] = useState('')

  const onPressService = (service: string) => {
    setSchedule({
      ...schedule,
      service: service
    })

    router.push(routes.CLIENT_SCHEDULE_TIME)
  }

  return (
    <Container>
      <CustomText
        text="Escolha qual serviço deseja fazer"
        type="paragraph"
        textAlign="left"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.list}>
        <FlatList
          data={filteredServices}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.name}
              key={item.id}
              image={item.icon}
              searchTerm={searchTerm}
              onPress={() => onPressService(item.id)}
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
