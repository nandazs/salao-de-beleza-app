import { View, StyleSheet, Image, Pressable } from 'react-native'
import CustomText from '@src/components/text/custom-text'
import { theme } from '@src/configs/theme'
import { Dispatch, SetStateAction, useState } from 'react'

interface PickerProps {
  items: Array<{ name: string; id: string }>
  placeholder: string
  setSelected: Dispatch<SetStateAction<string | undefined>>
  selected?: string
}

export const Picker = ({
  items,
  placeholder,
  setSelected,
  selected
}: PickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!items) {
    return null
  }

  const onPressPicker = () => {
    if (isOpen) {
      return setIsOpen(false)
    }

    setIsOpen(true)
  }

  const onPressItem = (selected: string) => {
    console.log('osdksoksdosdksod', selected)
    setSelected(selected)
    setIsOpen(false)
  }

  return (
    <View>
      <Pressable style={styles.picker} onPress={onPressPicker}>
        <View>
          <CustomText
            text={selected ?? placeholder}
            textAlign="left"
            type="paragraph"
          />
        </View>
        <Image source={require('@src/assets/images/icons/down-arrow.png')} />
      </Pressable>
      <View style={[styles.items, isOpen && styles.open]}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onPressItem(item.id)}
            style={styles.item}>
            <CustomText text={item.name} textAlign="left" type="paragraph" />
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: theme.colors.light,
    borderRadius: theme.sizes.tiny,
    paddingVertical: theme.sizes.small,
    paddingHorizontal: theme.sizes.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  items: {
    backgroundColor: theme.colors.light,
    marginTop: theme.sizes.small,
    borderRadius: theme.sizes.tiny,
    display: 'none'
  },
  item: {
    paddingVertical: theme.sizes.small,
    paddingHorizontal: theme.sizes.small
  },
  open: {
    display: 'flex'
  }
})
