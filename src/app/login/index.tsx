import { StyleSheet, View, Text, Image } from 'react-native'
import { useForm } from 'react-hook-form'
import Button from '@src/components/button'
import { Link } from 'expo-router'
import { CustomTextInput } from '@src/components/forms/custom-text-input'
import { theme } from '@src/configs/theme'

export default function LoginPage() {
  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues: { email: '', password: '' } })

  //const onSubmit = (data: any) => console.log(data)

  const onPressLoginButton = () => {
    console.log('Teste')
  }

  const onPressRegisterButton = () => {
    console.log('Teste')
  }

  return (
    <View style={styles.lp_container}>
      <Image
        source={require('@src/assets/images/icons/email.png')}
        alt={`Logo do estabelecimento`}
      />
      <View style={styles.lp_form}>
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
        <Link href="/" style={styles.lp_forgotPsd}>
          Esqueceu a senha?
        </Link>
        <Button
          text="Entrar"
          uppercase
          onPress={onPressLoginButton}
          additionalStyle={{ button: styles.lp_button }}
        />
      </View>
      <View style={styles.lp_divider}></View>
      <Button
        text="Criar conta"
        onPress={onPressRegisterButton}
        additionalStyle={{ button: styles.lp_button }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  lp_container: {
    alignItems: 'center'
  },
  lp_form: {
    width: '100%'
  },
  lp_forgotPsd: {
    textAlign: 'right',
    marginTop: theme.sizes.tiny,
    marginBottom: theme.sizes.large
  },
  lp_divider: {
    backgroundColor: '#000',
    height: 1,
    marginTop: theme.sizes.medium,
    marginBottom: theme.sizes.medium,
    width: '100%'
  },
  lp_button: {
    width: '100%'
  }
})
