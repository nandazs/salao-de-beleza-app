import Button from '@src/components/button'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { View, StyleSheet } from 'react-native'

export default function ClientScheduleConfirmationScreen() {
  const info = {
    date: '12/06/24',
    service: 'Corte de cabelo',
    professional: 'Anna',
    time: '10:00'
  }

  const onPressRefused = () => {
    console.log('NOOOOO')
  }
  const onPressAccepted = () => {}

  return (
    <Container additionalStyle={styles.container}>
      <View style={styles.text}>
        <CustomText
          text={`Data: ${info.date}`}
          type="content"
          textAlign="left"
        />
        <CustomText
          text={`Serviço: ${info.service}`}
          type="content"
          textAlign="left"
        />
        <CustomText
          text={`Profissional: ${info.professional}`}
          type="content"
          textAlign="left"
        />
        <CustomText
          text={`Horário: ${info.time}`}
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
