import CustomBackButton from '@src/components/custom-back-button'
import { theme } from '@src/configs/theme'
import { routes } from '@src/configs/types/routes'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.typography.title.color,
          fontSize: theme.typography.title.fontSize
        }
      }}>
      <Stack.Screen
        name="servicos"
        options={{
          title: 'SERVIÇOS',
          headerLeft: () => <CustomBackButton url="/" />
        }}
      />
      <Stack.Screen
        name="profissionais"
        options={{
          title: 'PROFISSIONAIS',
          headerLeft: () => (
            <CustomBackButton url={routes.CLIENT_SCHEDULE_SERVICE} />
          )
        }}
      />
      <Stack.Screen
        name="horarios"
        options={{
          title: 'HORÁRIOS',
          headerLeft: () => (
            <CustomBackButton url={routes.CLIENT_SCHEDULE_PROFESSIONAL} />
          )
        }}
      />
      <Stack.Screen
        name="confirmacao"
        options={{
          title: 'CONFIRMAÇÃO',
          headerLeft: () => (
            <CustomBackButton url={routes.CLIENT_SCHEDULE_TIME} />
          )
        }}
      />
    </Stack>
  )
}
