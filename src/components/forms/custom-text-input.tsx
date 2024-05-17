import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageSourcePropType
} from 'react-native'
import { Control, Controller, FieldError } from 'react-hook-form'
import { theme } from '@src/configs/theme'

interface InputTextProps {
  control?: Control<any, any>
  error?: FieldError
  image?: ImageSourcePropType
  placeholder: string
  name: 'email' | 'password' | 'search'
  onChangeText?: any
  value?: any
  iconPosition?: 'left' | 'right'
}

export const CustomTextInput = ({
  control,
  error,
  image,
  placeholder,
  name,
  onChangeText,
  value,
  iconPosition = 'left'
}: InputTextProps) => {
  return (
    <>
      <View
        style={[
          styles.lp_inputContainer,
          iconPosition === 'right' && styles.iconRight
        ]}>
        {control ? (
          <>
            {image && <Image source={image} />}
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.lp_input}
                  placeholderTextColor={theme.typography.color.medium}
                />
              )}
              name={name}
            />
            {error && <Text>Esse campo é obrigatório.</Text>}
          </>
        ) : (
          <>
            <TextInput
              placeholder={placeholder}
              onChangeText={onChangeText}
              value={value}
              style={styles.lp_input}
              placeholderTextColor={theme.typography.color.medium}
            />
            {image && <Image source={image} />}
          </>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  lp_inputContainer: {
    backgroundColor: theme.colors.light,
    marginTop: theme.sizes.small,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.sizes.tiny,
    width: '100%'
  },
  lp_input: {
    fontSize: theme.typography.placeholder.fontSize,
    padding: theme.sizes.small,
    flex: 1
  },
  iconRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: theme.sizes.small
  }
})
