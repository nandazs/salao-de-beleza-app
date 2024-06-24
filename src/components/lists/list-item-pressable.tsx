import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Pressable
} from 'react-native'
import CustomText from '../text/custom-text'
import { Link } from 'expo-router'
import { theme } from '@src/configs/theme'

interface ListItemPressableProps {
  label: string
  image?: ImageSourcePropType
  key?: string | number
  searchTerm?: string
  imageStyle?: any
  url?: string
  leftIcon?: any
  onPress?: any
}

interface ListItemProps {
  label: string
  image?: ImageSourcePropType
  key?: string | number
  searchTerm?: string
  imageStyle?: any
  leftIcon?: any
  onPress?: any
}

function ListItem({
  onPress,
  key,
  image,
  imageStyle,
  label,
  leftIcon
}: ListItemProps) {
  return (
    <Pressable onPress={onPress}>
      <View key={key} style={styles.item}>
        {image && <Image source={image} style={imageStyle} />}
        <CustomText type="content" text={label} />
        <Image
          source={leftIcon ?? require('@src/assets/images/icons/arrow.png')}
          style={styles.letfIcon}
        />
      </View>
    </Pressable>
  )
}

export default function ListItemPressable({
  label,
  image,
  key,
  searchTerm,
  imageStyle,
  url,
  leftIcon,
  onPress
}: ListItemPressableProps) {
  const searchTermMatchsLabel = searchTerm
    ? label.toLowerCase().includes(searchTerm?.toLowerCase() || searchTerm)
    : ''

  if (searchTermMatchsLabel || !searchTerm) {
    return url ? (
      <Link href={url} asChild>
        <ListItem
          onPress={onPress}
          key={key}
          image={image}
          imageStyle={imageStyle}
          label={label}
          leftIcon={leftIcon}
        />
      </Link>
    ) : (
      <ListItem
        onPress={onPress}
        key={key}
        image={image}
        imageStyle={imageStyle}
        label={label}
        leftIcon={leftIcon}
      />
    )
  }

  return <></>
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.secondary,
    marginTop: theme.sizes.small,
    paddingVertical: theme.sizes.small,
    paddingHorizontal: theme.sizes.small,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: theme.sizes.small
  },
  letfIcon: {
    position: 'absolute',
    right: theme.sizes.small
  }
})
