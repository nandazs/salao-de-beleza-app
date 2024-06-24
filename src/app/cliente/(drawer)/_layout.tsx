import CustomDrawerMenu from '@src/components/custom-drawer-menu'

export default function Layout() {
  const menu = [
    {
      name: 'index',
      title: '',
      drawerLabel: 'Início'
    },
    {
      name: 'agendamentos',
      title: 'Agendamentos',
      drawerLabel: 'Agendamentos'
    }
  ]

  return <CustomDrawerMenu menu={menu} />
}
