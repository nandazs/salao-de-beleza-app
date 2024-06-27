import { SiteSettings } from '@src/configs/types/site'

export const getSiteConfigs = () => {
  const config: SiteSettings = require('@src/config/salao-de-beleza-app.json')

  return config
}
