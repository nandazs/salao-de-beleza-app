import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { Link } from 'expo-router'

export default function ClientSchedulesScreen() {
  return (
    <Container>
      <CustomText text="CLIENTE AGENDAMENTOS" />
      <Link href="/">Voltar - home</Link>
    </Container>
  )
}
