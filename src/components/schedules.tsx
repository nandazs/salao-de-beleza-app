import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { NormalizedSchedules } from '@src/normalizers/types'
import { StyleSheet, View } from 'react-native'

interface SchedulesProps {
  schedules: NormalizedSchedules
}

export const Schedules = ({ schedules }: SchedulesProps) => {
  return (
    <View style={styles.container}>
      {schedules.map((item) => (
        <View key={item.idAgendamento} style={styles.schedule}>
          <CustomText
            text={`Data: ${item.data}`}
            type="content"
            textAlign="left"
          />
          <CustomText
            text={`Horário: ${item.hora}`}
            type="content"
            textAlign="left"
          />
          <CustomText
            text={`Serviço: ${item.servico}`}
            type="content"
            textAlign="left"
          />
          <CustomText
            text={`Profissional: ${item.nomeFuncionario}`}
            type="content"
            textAlign="left"
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: theme.sizes.small,
    marginVertical: theme.sizes.small
  },
  schedule: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'column',
    borderRadius: theme.sizes.small,
    padding: theme.sizes.standard
  }
})
