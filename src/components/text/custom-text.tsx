import { theme } from '@src/configs/theme'
import { StyleSheet, Text } from 'react-native'

interface CustomTextProps {
  text: string
  type?: 'title' | 'subtitle' | 'content' | 'placeholder' | 'paragraph'
  textAlign?: 'center' | 'left' | 'right' | 'justify'
  style?: object
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  margin?: number
  marginBottom?: number
  fontSize?: number
}

export default function CustomText({
  text,
  type = 'title',
  textAlign = 'center',
  style,
  textTransform = 'none',
  margin,
  marginBottom,
  fontSize
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

    if (type === 'paragraph') {
      return styles.paragraph
    }
  }

  const styleByType = getStylesByType()

  return (
    <Text
      style={[
        styleByType,
        style,
        {
          textTransform,
          textAlign,
          margin,
          marginBottom,
          fontSize: fontSize ?? styleByType?.fontSize
        }
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
  },
  paragraph: {
    fontSize: theme.typography.paragraph.fontSize,
    color: theme.typography.paragraph.color
  }
})
