import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import Button from '@src/components/button'
import { CustomTextInput } from '@src/components/forms/custom-text-input'
import CustomText from '@src/components/text/custom-text'
import { Container } from '@src/components/container'
import { theme } from '@src/configs/theme'
import { useSessionContext } from '@src/state/session-provider'
import { LoginRequest } from '@src/services/types'
import { useCallback } from 'react'

export default function LoginPage() {
  const { handleLogin } = useSessionContext()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onPressLoginButton = useCallback((data: LoginRequest) => {
    handleLogin(data)
  }, [])

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.background, height: '100%' }}>
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
            secureTextEntry
          />
          <View style={styles.button_view}>
            <Button
              text="Entrar"
              uppercase
              onPress={handleSubmit(onPressLoginButton)}
              additionalStyle={{ button: styles.button }}
            />
          </View>
        </View>
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
