import Button from '@src/components/button'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { useCurrentUser, useRegisterSchedule } from '@src/services/hooks'
import { useAppContext } from '@src/state/hooks'
import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function ClientScheduleConfirmationScreen() {
  const router = useRouter()
  const { schedule, setSchedule } = useAppContext()
  const registerSchedule = useRegisterSchedule()
  const currentUser = useCurrentUser()

  const onPressRefused = () => {
    router.push(routes.CLIENT_HOME)
  }
  const onPressAccepted = () => {
    registerSchedule.mutate(
      { ...schedule, clientId: currentUser.userId },
      {
        onSuccess: () => {
          setSchedule(undefined)
          router.push(routes.CLIENT_HOME)
        }
      }
    )
  }

  return (
    <Container additionalStyle={styles.container}>
      <CustomText
        text="Revise o seu agendamento antes de confirmar:"
        type="paragraph"
      />

      <View style={styles.text}>
        <CustomText
          text={`Data: ${schedule?.date}`}
          type="content"
          textAlign="left"
        />
        <CustomText
          text={`Serviço: ${schedule?.service}`}
          type="content"
          textAlign="left"
        />
        <CustomText
          text={`Profissional: ${schedule?.professional?.name}`}
          type="content"
          textAlign="left"
        />
        <CustomText
          text={`Horário: ${schedule?.time}`}
          type="content"
          textAlign="left"
        />
      </View>
      <View>
        <CustomText text="Deseja confirmar agendamento?" type="subtitle" />
        <View style={styles.button_container}>
          <Button
            text="Não"
            onPress={onPressRefused}
            additionalStyle={{ button: styles.button }}
          />
          <Button
            text="Sim"
            onPress={onPressAccepted}
            additionalStyle={{ button: styles.button }}
          />
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    gap: theme.sizes.large,
    paddingTop: theme.sizes.semi
  },
  list: {
    marginTop: theme.sizes.small
  },
  text: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'column',
    borderRadius: theme.sizes.small,
    padding: theme.sizes.standard
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.sizes.small,
    gap: theme.sizes.small,
    marginBottom: theme.sizes.small
  },
  button: {
    flex: 1
  }
})
