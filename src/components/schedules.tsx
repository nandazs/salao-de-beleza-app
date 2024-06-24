import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { StyleSheet, View } from 'react-native'

interface SchedulesProps {
  schedules: Array<{
    data: string
    horario: string
    servico: string
    profissional: string
    id: string | number
  }>
}

export const Schedules = ({ schedules }: SchedulesProps) => {
  return (
    <View style={styles.container}>
      {schedules.map((item) => (
        <View key={item.id} style={styles.schedule}>
          <CustomText
            text={`Data: ${item.data}`}
            type="content"
            textAlign="left"
          />
          <CustomText
            text={`Horário: ${item.horario}`}
            type="content"
            textAlign="left"
          />
          <CustomText
            text={`Serviço: ${item.servico}`}
            type="content"
            textAlign="left"
          />
          <CustomText
            text={`Profissional: ${item.profissional}`}
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
