import { Container } from '@src/components/container'
import ListItem from '@src/components/lists/list-item'
import { useAppContext } from '@src/state/hooks'
import { Link } from 'expo-router'
import { FlatList } from 'react-native'

export default function AdminHomeScreen() {
  const context = useAppContext()

  console.log('OKSOSDKSODKSOKSOK', context)

  const services2 = [
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '1'
    },
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '2'
    },
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '3'
    },
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '4'
    },
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '5'
    },
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '6'
    },
    {
      data: '12/07 - 09:00',
      cliente: 'Ana',
      servico: 'Corte de cabelo',
      id: '7'
    }
  ]

  return (
    <Container>
      <Link href="/">HOME</Link>
      <FlatList
        data={services2}
        renderItem={({ item }) => (
          <ListItem
            labels={[
              item.data,
              `Cliente: ${item.cliente}`,
              `Serviço: ${item.servico}`
            ]}
            id={item.id}
          />
        )}
      />
    </Container>
  )
}
