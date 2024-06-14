import { theme } from '@src/configs/theme'
import { Link } from 'expo-router'
import { Pressable, Image, StyleSheet } from 'react-native'

interface CustomBackButton {
  url: string
}

export default function CustomBackButton({ url }: CustomBackButton) {
  return (
    <Link href={url} asChild testID="link">
      <Pressable style={styles.back_button} testID="pressable">
        <Image
          source={require('@src/assets/images/icons/arrow-left.png')}
          testID="image"
        />
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  back_button: {
    backgroundColor: theme.colors.light,
    borderRadius: theme.sizes.micro,
    padding: theme.sizes.micro
  }
})
