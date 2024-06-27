import CustomDrawerMenu from '@src/components/custom-drawer-menu'

export default function Layout() {
  const menu = [
    {
      name: 'index',
      title: 'Agendamentos',
      drawerLabel: 'Início'
    },
    {
      name: 'configuracoes',
      title: 'Configurações',
      drawerLabel: 'Configurações'
    }
  ]

  return <CustomDrawerMenu menu={menu} />
}
