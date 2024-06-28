import { Container } from '@src/components/container'
import ListItemPressable from '@src/components/lists/list-item-pressable'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useGetClientSchedules, useGetUserData } from '@src/services/hooks'
import { StyleSheet, View } from 'react-native'

export default function ClientHomeScreen() {
  const { data } = useGetUserData()

  const { data: schedules } = useGetClientSchedules(data?.userId)

  return (
    <Container>
      <CustomText text="BEM-VINDO(A)" textAlign="left" />
      {schedules ? (
        <View>
          <CustomText
            text="Confira os seus agendamentos:"
            textAlign="left"
            type="paragraph"
            style={styles.description1}
          />
          <ListItemPressable
            label="Meus agendamentos"
            url={routes.CLIENT_SCHEDULES}
          />
          <CustomText
            text="Ou agende um novo horário:"
            textAlign="left"
            type="paragraph"
            style={styles.description2}
          />
          <ListItemPressable
            label="Agendar"
            url={routes.CLIENT_SCHEDULE_PROFESSIONAL}
          />
        </View>
      ) : (
        <View>
          <CustomText
            text="Você não possui nenhum serviço agendado. Clique no botão abaixo para agendar um horário:"
            textAlign="left"
            type="paragraph"
            style={styles.description1}
          />
          <ListItemPressable
            label="Agendar"
            url={routes.CLIENT_SCHEDULE_PROFESSIONAL}
          />
        </View>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  description1: {
    marginTop: theme.sizes.small
  },
  description2: {
    marginTop: theme.sizes.standard
  }
})
