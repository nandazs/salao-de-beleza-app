import { Container } from '@src/components/container'
import SearchInput from '@src/components/forms/search-input'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useGetProfessionalsBySalon } from '@src/services/hooks'
import { Professional } from '@src/services/types'
import { useAppContext } from '@src/state/hooks'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

export default function ClientScheduleProfessionalScreen() {
  const [searchTerm, setSearchTerm] = useState('')
  const { salonId, setSelectedProfessionalByClient, setSchedule } =
    useAppContext()

  if (!salonId) {
    return null
  }

  const { data } = useGetProfessionalsBySalon(salonId)
  const router = useRouter()

  const onPressProfessional = (item: Professional) => {
    console.log('OSDKSOKSDOSKOS', item)
    setSelectedProfessionalByClient(item)

    setSchedule({
      professional: {
        name: item.nomeFuncionario,
        id: item.idFuncionario
      }
    })

    router.push(routes.CLIENT_SCHEDULE_SERVICE)
  }

  return (
    <Container>
      <CustomText
        text="Escolha por qual profissional deseja ser atendido(a)"
        type="paragraph"
        textAlign="left"
      />
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItemPressable
              label={item.nomeFuncionario}
              key={item.idFuncionario}
              searchTerm={searchTerm}
              onPress={() => onPressProfessional(item)}
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
