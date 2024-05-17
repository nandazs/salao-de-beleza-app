import Button from '@src/components/button'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { View, StyleSheet } from 'react-native'

export default function ConfirmacaoPage() {
  const info = {
    date: '12/06/24',
    service: 'Corte de cabelo',
    professional: 'Anna',
    hour: '10:00'
  }

  const onPressRefused = () => {
    console.log('NOOOOO')
  }
  const onPressAccepted = () => {}

  return (
    <View style={styles.confirmation_container}>
      <View style={styles.confirmation_text}>
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
          text={`Horário: ${info.hour}`}
          type="content"
          textAlign="left"
        />
      </View>
      <View>
        <CustomText text="Deseja confirmar agendamento?" type="subtitle" />
        <View style={styles.confirmation_buttons}>
          <Button
            text="Não"
            onPress={onPressRefused}
            additionalStyle={{ button: styles.confirmation_button }}
          />
          <Button
            text="Sim"
            onPress={onPressAccepted}
            additionalStyle={{ button: styles.confirmation_button }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  confirmation_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: theme.sizes.semi,
    paddingBottom: theme.sizes.semi,
    justifyContent: 'center',
    gap: theme.sizes.large
  },
  confirmation_listContainer: {
    marginTop: theme.sizes.small
  },
  confirmation_text: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'column',
    borderRadius: theme.sizes.small,
    padding: theme.sizes.standard
  },
  confirmation_buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.sizes.small,
    gap: theme.sizes.small
  },
  confirmation_button: {
    flex: 1
  }
})
