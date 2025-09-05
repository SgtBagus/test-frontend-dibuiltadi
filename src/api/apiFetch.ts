// lib/apiFetch.ts
export type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null // server-side safety
  const match = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export async function apiFetch<T = any>(
  endpoint: string,
  { method = 'GET', body, headers }: FetchOptions = {}
): Promise<T> {
  const finalHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(headers || {})
  }

  // kalau token ada → inject Authorization
  if (getTokenFromCookie()) {
    finalHeaders['Authorization'] = `Bearer ${getTokenFromCookie()}`
  }

  const res = await fetch(`${process.env.BASE_URL_API}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    let errMsg = 'Request failed'
    try {
      const errJson = await res.json()
      errMsg = errJson.message || JSON.stringify(errJson)
    } catch {
      errMsg = await res.text()
    }
    throw new Error(errMsg)
  }

  return res.json()
}
