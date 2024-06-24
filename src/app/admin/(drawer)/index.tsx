import { Container } from '@src/components/container'
import ListItem from '@src/components/lists/list-item'
import CustomText from '@src/components/text/custom-text'
import { useAppContext } from '@src/state/hooks'
import { FlatList, View } from 'react-native'

export default function AdminHomeScreen() {
  const context = useAppContext()

  const services2 = [
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '1'
    },
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '2'
    },
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '3'
    },
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '4'
    },
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '5'
    },
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '6'
    },
    {
      data: '12/07/24',
      hora: '09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '7'
    }
  ]

  const hasSchedules = false

  return (
    <Container
      additionalStyle={
        !hasSchedules
          ? {
              alignItems: 'center',
              justifyContent: 'center'
            }
          : {}
      }>
      {hasSchedules ? (
        <>
          <FlatList
            data={services2}
            renderItem={({ item }) => (
              <ListItem
                labels={[
                  item.data,
                  item.hora,
                  `Serviço: ${item.servico}`,
                  `Cliente: ${item.cliente}`
                ]}
                id={item.id}
              />
            )}
          />
        </>
      ) : (
        <View>
          <CustomText
            text="O salão não possui nenhuma agenda no momento."
            textAlign="left"
            type="title"
          />
        </View>
      )}
    </Container>
  )
}
