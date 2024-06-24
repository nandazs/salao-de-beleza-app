import { theme } from '@src/configs/theme'
import { Pressable, StyleSheet, View } from 'react-native'
import CustomText from './text/custom-text'
import { Link } from 'expo-router'

interface Props {
  text: string
  uppercase?: boolean
  onPress?: any
  url?: string
  additionalStyle?: {
    button?: any
    text?: any
  }
}

export default function Button({
  text,
  uppercase = false,
  onPress,
  url,
  additionalStyle
}: Props) {
  return url ? (
    <View style={[styles.link_button, additionalStyle?.button]}>
      <Link href={url}>
        <Pressable>
          <CustomText
            style={[styles.link_text, additionalStyle?.text]}
            type="paragraph"
            text={uppercase ? text.toUpperCase() : text}
          />
        </Pressable>
      </Link>
    </View>
  ) : (
    <Pressable
      style={[styles.link_button, additionalStyle?.button]}
      onPress={onPress}>
      <CustomText
        style={[styles.link_text, additionalStyle?.text]}
        type="paragraph"
        text={uppercase ? text.toUpperCase() : text}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  link_button: {
    backgroundColor: theme.colors.button,
    padding: theme.sizes.small,
    borderRadius: theme.sizes.tiny,
    alignItems: 'center'
  },
  link_text: {
    color: theme.typography.color.white,
    fontSize: theme.typography.button.fontSize
  }
})
