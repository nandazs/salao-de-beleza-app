import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import Button from '@src/components/button'
import { CustomTextInput } from '@src/components/forms/custom-text-input'
import CustomText from '@src/components/text/custom-text'
import { Container } from '@src/components/container'
import { theme } from '@src/configs/theme'
import { Link } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSessionContext } from '@src/state/session-provider'

export default function LoginPage() {
  const { handleLogin } = useSessionContext()

  AsyncStorage.setItem('a', 'b')

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onPressLoginButton = (data: { email: string; password: string }) => {
    handleLogin(data)
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <Container>
        <CustomText
          text="Faça login na sua conta de cliente ou administrador"
          type="title"
          textAlign="left"
          style={styles.title}
        />
        <View>
          <CustomTextInput
            control={control}
            image={require('@src/assets/images/icons/email.png')}
            error={errors.email}
            placeholder="E-mail"
            name="email"
          />
          <CustomTextInput
            control={control}
            image={require('@src/assets/images/icons/password.png')}
            error={errors.password}
            placeholder="Senha"
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
          <View style={styles.button_view}>
            <Button
              text="Entrar"
              uppercase
              onPress={handleSubmit(onPressLoginButton)}
              additionalStyle={{ button: styles.button }}
            />
          </View>
        </View>

        <Link href="/">VOTLAR</Link>
      </Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    marginVertical: theme.sizes.small
  },
  button_view: {
    marginTop: theme.sizes.small,
    alignItems: 'flex-end'
  },
  button: {
    padding: theme.sizes.small
  }
})
