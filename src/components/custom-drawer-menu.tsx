import { theme } from '@src/configs/theme'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerToggleButton
} from '@react-navigation/drawer'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useSessionContext } from '@src/state/session-provider'

interface CustomDrawerMenuProps {
  menu: Array<{
    name: string
    title?: string
    drawerLabel?: string
  }>
}

function CustomDrawerContent(drawerProps: DrawerContentComponentProps) {
  const { handleLogout } = useSessionContext()

  return (
    <DrawerContentScrollView {...drawerProps}>
      <View style={styles.menu_header} />
      <DrawerItemList {...drawerProps} />
      <Pressable onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </DrawerContentScrollView>
  )
}

export default function CustomDrawerMenu({ menu }: CustomDrawerMenuProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: theme.colors.secondary
          },
          drawerLabelStyle: {
            color: theme.typography.color.white
          },
          headerStyle: {
            backgroundColor: theme.colors.background
          },
          headerTitleStyle: {
            color: theme.typography.title.color,
            fontSize: theme.typography.title.fontSize
          },
          headerLeft: () => <DrawerToggleButton />
        }}>
        {menu.map((item, index) => {
          return (
            <Drawer.Screen
              key={index}
              name={item.name}
              options={{
                drawerLabel: item.drawerLabel,
                title: item.title,
                drawerItemStyle: {
                  display: item.drawerLabel ? 'flex' : 'none'
                }
              }}
            />
          )
        })}
      </Drawer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  menu_header: {
    borderRadius: theme.sizes.micro,
    padding: theme.sizes.standard,
    alignItems: 'center',
    borderBottomColor: theme.colors.light,
    borderBottomWidth: 1,
    marginBottom: theme.sizes.standard
  },
  logout: {
    marginLeft: theme.sizes.small,
    marginTop: theme.sizes.small
  },
  logoutText: {
    color: 'white',
    fontWeight: 500
  }
})
