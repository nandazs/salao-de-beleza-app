export const appendQueryParams = (url: string, params: any) => {
  if (params) {
    const separator = url.includes('?') ? '&' : '?'
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((data) =>
          data !== undefined || data !== null ? query.append(key, data) : null
        )
        continue
      }
      if (value !== undefined || value !== null) {
        query.append(key, String(value))
      }
    }
    return `${url}${query && separator}${query}`
  }

  return url
}

interface RequestProps {
  url: string
  method?: string
  params?: Record<string, any>
  body?: any
}

export const request = async ({
  url,
  method = 'GET',
  params,
  body
}: RequestProps) => {
  let endpoint = `http://localhost:8080${url}`
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  if (params) {
    endpoint = appendQueryParams(endpoint, params)
  }

  const options = {
    method,
    body,
    headers
  }

  return await fetch(endpoint, options)
    .then(async (response) => {
      return response
    })
    .then(async (response) => {
      const json = await response.json()

      if (!response.ok) {
        return { ...json, hasError: true, errorStatus: response.status }
      }

      return json
    })
    .catch((error) => {
      console.error(error)
    })
}
