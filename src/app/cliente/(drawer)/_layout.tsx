import CustomDrawerMenu from '@src/components/custom-drawer-menu'

export default function Layout() {
  const menu = [
    {
      name: 'index',
      title: '',
      drawerLabel: 'Home'
    },
    {
      name: 'agendamentos',
      title: 'Agendamentos',
      drawerLabel: 'Agendamentos'
    },
    { name: 'informacoes', title: 'Informações', drawerLabel: 'Informações' }
  ]

  return <CustomDrawerMenu menu={menu} />
}
