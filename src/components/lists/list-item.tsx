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

interface ListItemProps {
  label: string
  image?: ImageSourcePropType
  id: string
  searchTerm: string
  imageStyle?: any
  url: string
}

export default function ListItem({
  label,
  image,
  id,
  searchTerm,
  imageStyle,
  url
}: ListItemProps) {
  const searchTermMatchsLabel = label
    .toLowerCase()
    .includes(searchTerm?.toLowerCase() || searchTerm)

  return searchTermMatchsLabel ? (
    <Link href={url} asChild>
      <Pressable>
        <View key={id} style={styles.item}>
          {image && <Image source={image} style={imageStyle} />}
          <CustomText type="content" text={label} />
          <Image
            source={require('@src/assets/images/icons/arrow.png')}
            style={styles.arrow}
          />
        </View>
      </Pressable>
    </Link>
  ) : (
    <></>
  )
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
  arrow: {
    position: 'absolute',
    right: theme.sizes.small
  }
})
