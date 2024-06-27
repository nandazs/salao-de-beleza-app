import { Container } from '@src/components/container'
import ListItem from '@src/components/lists/list-item'
import CustomText from '@src/components/text/custom-text'
import { useGetSalonSchedules } from '@src/services/hooks'
import { useAppContext } from '@src/state/hooks'
import { FlatList, View } from 'react-native'

export default function AdminHomeScreen() {
  const { salonId } = useAppContext()

  if (!salonId) {
    return null
  }

  const { data } = useGetSalonSchedules(salonId)
  const hasSchedules = !!data?.length

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
            data={data}
            renderItem={({ item }) => (
              <ListItem
                labels={[
                  `Data: ${item.data}`,
                  `Horario: ${item.hora}`,
                  `Serviço: ${item.servico}`,
                  `Cliente: ${item.nomeCliente}`,
                  `Funcionário(a): ${item.nomeFuncionario}`
                ]}
                id={item.idAgendamento}
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
