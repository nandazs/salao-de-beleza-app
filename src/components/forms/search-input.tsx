import { CustomTextInput } from './custom-text-input'

interface SearchInputProps {
  searchTerm: any
  setSearchTerm: any
}

export default function SearchInput({
  searchTerm,
  setSearchTerm
}: SearchInputProps) {
  return (
    <CustomTextInput
      placeholder="Pesquisar"
      value={searchTerm}
      onChangeText={(text: string) => setSearchTerm(text)}
      name="search"
      image={require('@src/assets/images/icons/search.png')}
      iconPosition="right"
    />
  )
}
