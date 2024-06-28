import { routes } from '@src/configs/types/routes'
import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Container } from '@src/components/container'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { useEffect, useState } from 'react'
import { Picker } from '@src/components/picker'
import Button from '@src/components/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetAllSalons } from '@src/services/hooks'
import { useAppContext } from '@src/state/hooks'
import { useSessionContext } from '@src/state/session-provider'

export default function HomeScreen() {
  const { handleUnloggedToken } = useSessionContext()
  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    if (!hasToken) {
      handleUnloggedToken()
      setHasToken(true)
    }
  }, [hasToken])

  const [selected, setSelected] = useState<string>()
  const { data } = useGetAllSalons()
  const { setSalonId } = useAppContext()
  const router = useRouter()

  if (!data) {
    return (
      <CustomText text="Escolha a empresa" type="title" style={styles.title} />
    )
  }

  const salons = data?.map((salon) => ({
    name: salon.nomeSalao,
    id: salon.idSalao
  }))

  if (!salons?.length) {
    return null
  }

  const onPressContinueButton = () => {
    setSalonId(selected)
    router.push(routes.LOGIN)
  }

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
          items={salons}
          placeholder="Selecionar"
          setSelected={setSelected}
          selected={selected}
        />
        <View style={styles.button}>
          <Button text="Continuar" onPress={onPressContinueButton} />
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
