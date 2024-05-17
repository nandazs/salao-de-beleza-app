import { theme } from '@src/configs/theme'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
  text: string
  uppercase?: boolean
  onPress: any
  additionalStyle?: {
    button?: any
    text?: any
  }
}

export default function Button({
  text,
  uppercase = false,
  onPress,
  additionalStyle
}: Props) {
  return (
    <Pressable
      style={[styles.link_button, additionalStyle?.button]}
      onPress={onPress}>
      <Text style={[styles.link_text, additionalStyle?.text]}>
        {uppercase ? text.toUpperCase() : text}
      </Text>
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
