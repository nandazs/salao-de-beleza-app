import { routes } from '@src/configs/types/routes'
import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { useState } from 'react'
import { Picker } from '@src/components/picker'
import Button from '@src/components/button'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const [selected, setSelected] = useState<{ nome: string } | undefined>()

  const empresas = [
    { nome: 'Salao1' },
    { nome: 'Salao2' },
    { nome: 'Salao3' },
    { nome: 'Salao4' }
  ]

  const onPressContinueButton = () => {}

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <Container>
        <View style={styles.container}>
          <CustomText
            text="Escolha a empresa"
            type="title"
            style={styles.title}
          />
        </View>
        <View style={styles.description}>
          <CustomText
            text="Selecione um salão de beleza para"
            textAlign="left"
            type="paragraph">
            <CustomText
              text="agendar um horário"
              textAlign="left"
              type="paragraph"
              fontWeight="semibold"
            />
            <CustomText text="ou" textAlign="left" type="paragraph" />
            <CustomText
              text="administrar ele:"
              textAlign="left"
              type="paragraph"
              fontWeight="semibold"
            />
          </CustomText>
        </View>
        <Picker
          items={empresas}
          placeholder="Selecionar"
          setSelected={setSelected}
          selected={selected}
        />
        <View style={styles.button}>
          <Button text="Continuar" onPress={onPressContinueButton} />
        </View>
        <View>
          <Link href={routes.LOGIN} style={styles.link}>
            LOGIN
          </Link>
          <Link href={routes.ADMIN_HOME} style={styles.link}>
            HOME DO ADMIN
          </Link>
          <Link href={routes.CLIENT_HOME} style={styles.link}>
            HOME DO CLIENTE
          </Link>
        </View>
      </Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.sizes.semi,
    paddingHorizontal: theme.sizes.small,
    borderRadius: theme.sizes.tiny,
    marginVertical: theme.sizes.standard,
    marginBottom: theme.sizes.semi
  },
  title: {
    color: theme.typography.color.white
  },
  description: {
    marginBottom: theme.sizes.semi
  },
  link: {
    marginTop: 24
  },
  button: {
    alignItems: 'flex-end',
    marginTop: theme.sizes.small
  }
})
