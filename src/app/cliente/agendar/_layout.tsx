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
        name="profissionais"
        options={{
          title: 'Profissionais',
          headerLeft: () => <CustomBackButton url={routes.CLIENT_HOME} />
        }}
      />
      <Stack.Screen
        name="servicos"
        options={{
          title: 'Serviços',
          headerLeft: () => (
            <CustomBackButton url={routes.CLIENT_SCHEDULE_PROFESSIONAL} />
          )
        }}
      />
      <Stack.Screen
        name="horarios"
        options={{
          title: 'Horários',
          headerLeft: () => (
            <CustomBackButton url={routes.CLIENT_SCHEDULE_SERVICE} />
          )
        }}
      />
      <Stack.Screen
        name="confirmacao"
        options={{
          title: 'Confirmação',
          headerLeft: () => (
            <CustomBackButton url={routes.CLIENT_SCHEDULE_TIME} />
          )
        }}
      />
    </Stack>
  )
}
