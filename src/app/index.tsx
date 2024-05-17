import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.home_container}>
      <Link href={routes.CLIENTE_HOME}>HOME DO CLIENTE</Link>
      <Link href={routes.AGENDAR_SERVICOS}>SERVICOS</Link>
      <Link href={routes.AGENDAR_PROFISSIONAIS}>PROFISSIONAIS</Link>
      <Link href={routes.AGENDAR_HORARIOS}>HORARIOS</Link>
      <Link href={routes.AGENDAR_CONFIRMACAO}>CONFIRMAÇÃO</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  home_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: 100
  }
})
