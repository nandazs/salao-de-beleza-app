import { theme } from '@src/configs/theme'
import { StyleSheet, Text } from 'react-native'

interface CustomTextProps {
  text: string
  type: 'title' | 'subtitle' | 'content' | 'placeholder'
  textAlign?: 'center' | 'left' | 'right' | 'justify'
  additionalStyle?: object
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  margin?: number
  marginBottom?: number
}

export default function CustomText({
  text,
  type,
  textAlign = 'center',
  additionalStyle,
  textTransform = 'none',
  margin,
  marginBottom
}: CustomTextProps) {
  const getStylesByType = () => {
    if (type === 'title') {
      return styles.title
    }

    if (type === 'subtitle') {
      return styles.subtitle
    }

    if (type === 'content') {
      return styles.content
    }

    if (type === 'placeholder') {
      return styles.placeholder
    }
  }

  const styleByType = getStylesByType()

  return (
    <Text
      style={[
        styleByType,
        additionalStyle,
        { textTransform, textAlign, margin, marginBottom }
      ]}>
      {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.title.fontSize,
    color: theme.typography.title.color
  },
  subtitle: {
    fontSize: theme.typography.title.fontSize,
    color: theme.typography.subtitle.color
  },
  content: {
    fontSize: theme.typography.content.fontSize,
    color: theme.typography.content.color
  },
  placeholder: {
    fontSize: theme.typography.placeholder.fontSize,
    color: theme.typography.placeholder.color
  }
})
