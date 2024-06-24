export enum routes {
  LOGIN = '/login',
  CLIENT_HOME = '/cliente',
  CLIENT_SCHEDULE = '/cliente/agendar',
  CLIENT_SCHEDULE_SERVICE = '/cliente/agendar/servicos',
  CLIENT_SCHEDULE_PROFESSIONAL = 'cliente/agendar/profissionais',
  CLIENT_SCHEDULE_TIME = 'cliente/agendar/horarios',
  CLIENT_SCHEDULE_CONFIRM = 'cliente/agendar/confirmacao',
  ADMIN_HOME = '/admin',
  CLIENT_SCHEDULES = '/cliente/agendamentos',
  ADMIN_SERVICES = '/admin/config/servicos',
  ADMIN_ADD_SERVICE = '/admin/config/servicos/adicionar',
  ADMIN_REMOVE_SERVICE = '/admin/config/servicos/remover',
  ADMIN_PROFESSIONALS = '/admin/config/profissionais',
  ADMIN_ADD_PROFESSIONAL = '/admin/config/profissionais/adicionar',
  ADMIN_EDIT_PROFESSIONAL = '/admin/config/profissionais/editar/[id]',
  ADMIN_EDIT_PROFESSIONAL_SERVICES = '/admin/config/profissionais/editar/[id]/servicos',
  ADMIN_EDIT_PROFESSIONAL_TIMES = '/admin/config/profissionais/editar/[id]/horarios'
}
