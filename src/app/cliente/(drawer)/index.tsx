import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function ClientHomeScreen() {
  return (
    <Container>
      <CustomText text="BEM-VINDA" textAlign="left" />
      <CustomText
        text="Para começar o seu atendimento selecione o dia que deseja ser atendida(o)"
        textAlign="left"
        type="paragraph"
        style={styles.home_subtitle}
      />

      <Link href="/">Voltar - home</Link>
      <Link href={routes.CLIENT_SCHEDULE_SERVICE}>Servicos</Link>
    </Container>
  )
}

const styles = StyleSheet.create({
  home_subtitle: {
    marginTop: theme.sizes.small
  }
})
