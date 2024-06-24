import { Container } from '@src/components/container'
import { Schedules } from '@src/components/schedules'
import CustomText from '@src/components/text/custom-text'

export default function ClientSchedulesScreen() {
  const schedules = [
    {
      data: '12/07',
      horario: '09:0',
      profissional: 'Nome',
      servico: 'Corte de cabelo',
      id: 1
    },
    {
      data: '12/07',
      horario: '09:0',
      profissional: 'Nome',
      servico: 'Corte de cabelo',
      id: 1
    }
  ]

  return (
    <Container>
      <CustomText
        text="Confira os seus agendamentos:"
        type="paragraph"
        textAlign="left"
      />
      <Schedules schedules={schedules} />
    </Container>
  )
}
