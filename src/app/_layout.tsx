import 'expo-dev-client'
import { Slot } from 'expo-router'
import { View } from 'react-native'

export default function AppLayout() {
  return (
    <View>
      <Slot screenOptions={{ headerShown: false }} />
    </View>
  )
}
