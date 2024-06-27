import { Container } from '@src/components/container'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import { Schedules } from '@src/components/schedules'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useCurrentUser, useGetClientSchedules } from '@src/services/hooks'
import { StyleSheet } from 'react-native'

export default function ClientSchedulesScreen() {
  const currentUser = useCurrentUser()
  const { data } = useGetClientSchedules(currentUser.userId)

  console.log('OSKDOSKDSOSKO', data)

  if (!data?.length) {
    return (
      <Container>
        <CustomText
          text="Você não possui nenhum serviço agendado. Clique no botão abaixo para agendar um horário:"
          textAlign="left"
          type="paragraph"
          style={styles.empty}
        />
        <ListItemPressable
          label="Agendar"
          url={routes.CLIENT_SCHEDULE_SERVICE}
        />
      </Container>
    )
  }

  return (
    <Container>
      <CustomText
        text="Confira os seus agendamentos:"
        type="paragraph"
        textAlign="left"
      />
      <Schedules schedules={data} />
    </Container>
  )
}
const styles = StyleSheet.create({
  empty: {
    marginTop: theme.sizes.small
  }
})
