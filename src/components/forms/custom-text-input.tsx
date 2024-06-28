import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ImageSourcePropType
} from 'react-native'
import { Control, Controller, FieldError } from 'react-hook-form'
import { theme } from '@src/configs/theme'
import CustomText from '../text/custom-text'

interface InputTextProps {
  control?: Control<any, any>
  error?: FieldError
  image?: ImageSourcePropType
  placeholder?: string
  name: 'email' | 'password' | 'search' | 'name'
  onChangeText?: any
  value?: any
  iconPosition?: 'left' | 'right'
  label?: string
  secureTextEntry?: boolean
}

export const CustomTextInput = ({
  control,
  error,
  image,
  placeholder,
  name,
  onChangeText,
  value,
  iconPosition = 'left',
  label,
  secureTextEntry
}: InputTextProps) => {
  return (
    <View>
      {label && <CustomText text={label} textAlign="left" />}
      <View
        style={[
          styles.lp_inputContainer,
          iconPosition === 'right' && styles.iconRight,
          error && styles.error
        ]}>
        {control ? (
          <>
            {image && (
              <Image source={image} style={{ marginLeft: theme.sizes.small }} />
            )}
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.lp_input}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={theme.typography.title.color}
                  />
                </>
              )}
              name={name}
            />
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
      {error && (
        <CustomText
          text="Campo obrigatório"
          textAlign="left"
          type="paragraph"
          style={styles.errorText}
        />
      )}
    </View>
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
  },
  error: {
    borderWidth: 1,
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginTop: theme.sizes.tiny,
    marginBottom: theme.sizes.small
  }
})
