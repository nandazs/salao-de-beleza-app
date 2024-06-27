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
        name="servicos/index"
        options={{
          title: 'Serviços',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_CONFIGURATIONS} />
          )
        }}
      />
      <Stack.Screen
        name="servicos/adicionar"
        options={{
          title: 'Adicionar serviços',
          headerLeft: () => <CustomBackButton url={routes.ADMIN_SERVICES} />
        }}
      />
      <Stack.Screen
        name="servicos/remover"
        options={{
          title: 'Remover serviços',
          headerLeft: () => <CustomBackButton url={routes.ADMIN_SERVICES} />
        }}
      />

      <Stack.Screen
        name="profissionais/index"
        options={{
          title: 'Profissionais',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_CONFIGURATIONS} />
          )
        }}
      />
      <Stack.Screen
        name="profissionais/editar/index"
        options={{
          title: 'Profissional',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_PROFESSIONALS} />
          )
        }}
      />
      <Stack.Screen
        name="profissionais/editar/servicos"
        options={{
          title: 'Profissional',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_EDIT_PROFESSIONAL} />
          )
        }}
      />
      <Stack.Screen
        name="profissionais/adicionar"
        options={{
          title: 'Adicionar profissional',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_PROFESSIONALS} />
          )
        }}
      />
    </Stack>
  )
}
