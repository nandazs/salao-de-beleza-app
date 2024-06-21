import { useGetAllSalons } from '@src/services/hooks'

export default function SelectSalonScreen() {
  const { data } = useGetAllSalons()

  return <></>
}
