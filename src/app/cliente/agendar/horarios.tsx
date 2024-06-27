import { Container } from '@src/components/container'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useGetProfessionalsTimes } from '@src/services/hooks'
import { DateAndTime } from '@src/services/types'
import { useAppContext } from '@src/state/hooks'
import { useRouter } from 'expo-router'
import { View, StyleSheet, FlatList } from 'react-native'

export default function ClientScheduleTimeScreen() {
  const { setSchedule, schedule } = useAppContext()

  if (!schedule?.professional?.id) {
    return null
  }

  const { data } = useGetProfessionalsTimes(schedule?.professional?.id)
  const router = useRouter()

  const onPressTime = (item: DateAndTime) => {
    setSchedule({
      ...schedule,
      date: item.date,
      time: item.time
    })
    router.push(routes.CLIENT_SCHEDULE_CONFIRM)
  }

  return (
    <Container>
      <CustomText
        text="Escolha qual horário fica melhor para você"
        type="paragraph"
        textAlign="left"
      />
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItemPressable
              label={`${item.date} ${item.time}`}
              key={item.date}
              onPress={() => onPressTime(item)}
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
