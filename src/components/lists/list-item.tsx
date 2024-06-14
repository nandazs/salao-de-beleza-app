import { View, StyleSheet } from 'react-native'
import CustomText from '../text/custom-text'
import { theme } from '@src/configs/theme'

interface ListItemProps {
  labels: string[]
  id: string
}

export default function ListItem({ labels, id }: ListItemProps) {
  return (
    <View key={id} style={styles.item}>
      {labels.map((label) => {
        return (
          <CustomText key={label} type="content" text={label} fontSize={16} />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.secondary,
    marginTop: theme.sizes.small,
    paddingVertical: theme.sizes.small,
    paddingHorizontal: theme.sizes.small,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative'
  }
})
