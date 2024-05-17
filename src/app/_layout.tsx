import CustomBackButton from '@src/components/custom-back-button'
import { theme } from '@src/configs/theme'
import store from '@src/redux/store'
import 'expo-dev-client'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { Drawer } from 'expo-router/drawer'

export default function AppLayout() {
  return (
    <Provider store={store}>
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
        <Stack.Screen name="index" options={{ title: 'HOME' }} />
        <Stack.Screen
          name="cliente/index"
          options={{ title: 'BEM-VINDO', headerShown: false }}
        />
        <Stack.Screen
          name="cliente/agendar/servicos"
          options={{
            title: 'SERVIÇOS',
            headerLeft: () => <CustomBackButton url="/" />
          }}
        />
        <Stack.Screen
          name="cliente/agendar/profissionais"
          options={{
            title: 'PROFISSIONAIS',
            headerLeft: () => (
              <CustomBackButton url="/cliente/agendar/servicos" />
            )
          }}
        />
        <Stack.Screen
          name="cliente/agendar/horarios"
          options={{
            title: 'HORÁRIOS',
            headerLeft: () => (
              <CustomBackButton url="/cliente/agendar/profissionais" />
            )
          }}
        />
        <Stack.Screen
          name="cliente/agendar/confirmacao"
          options={{
            title: 'CONFIRMAÇÃO',
            headerLeft: () => (
              <CustomBackButton url="/cliente/agendar/horarios" />
            )
          }}
        />
      </Stack>
    </Provider>
  )
}
