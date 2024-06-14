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
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_CONFIGURATIONS} />
          )
        }}
      />
      <Stack.Screen
        name="profissionais"
        options={{
          title: 'PROFISSIONAIS',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_CONFIGURATIONS} />
          )
        }}
      />
      <Stack.Screen
        name="horarios"
        options={{
          title: 'HORÁRIOS',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_CONFIGURATIONS} />
          )
        }}
      />
      <Stack.Screen
        name="adicionar-servico"
        options={{
          title: 'Adicionar Serviço',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_REGISTER_SERVICE} />
          )
        }}
      />
      <Stack.Screen
        name="remover-servico"
        options={{
          title: 'Remover Serviço',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_REGISTER_SERVICE} />
          )
        }}
      />
      <Stack.Screen
        name="adicionar-profissional"
        options={{
          title: 'Adicionar Profissional',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_REGISTER_PROFESSIONAL} />
          )
        }}
      />
      <Stack.Screen
        name="remover-profissional"
        options={{
          title: 'Remover Profissional',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_REGISTER_PROFESSIONAL} />
          )
        }}
      />
      <Stack.Screen
        name="adicionar-horario"
        options={{
          title: 'Adicionar Horário',
          headerLeft: () => (
            <CustomBackButton url={routes.ADMIN_REGISTER_TIME} />
          )
        }}
      />
    </Stack>
  )
}
