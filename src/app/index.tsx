import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.home_container}>
      <Link href={routes.ADMIN_HOME} style={styles.link}>
        HOME DO ADMIN
      </Link>
      <Link href={routes.CLIENT_HOME} style={styles.link}>
        HOME DO CLIENTE
      </Link>
      <Link href={routes.CLIENT_SCHEDULE_SERVICE} style={styles.link}>
        SERVICOS
      </Link>
      <Link href={routes.CLIENT_SCHEDULE_PROFESSIONAL} style={styles.link}>
        PROFISSIONAIS
      </Link>
      <Link href={routes.CLIENT_SCHEDULE_TIME} style={styles.link}>
        HORARIOS
      </Link>
      <Link href={routes.CLIENT_SCHEDULE_CONFIRM} style={styles.link}>
        CONFIRMAÇÃO
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  home_container: {
    backgroundColor: theme.colors.background,
    height: '100%',
    padding: 100
  },
  link: {
    marginTop: 24
  }
})
