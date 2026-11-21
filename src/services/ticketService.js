import { CollectionDTO } from '@/dto/CollectionDTO.js'
import { TicketDTO } from '@/dto/TicketDTO.js'

const API_URL = import.meta.env.VITE_API_URL

export class ApiError extends Error {
  constructor(message, status, violations = []) {
    super(message)
    this.status = status
    this.violations = violations
  }
}

async function request(path, options = {}) {
  const response = await fetch(API_URL + path, {
    ...options,
    headers: {
      Accept: 'application/ld+json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    let data = null
    try {
      data = await response.json()
    } catch {
      // réponse sans JSON
    }
    throw new ApiError(
      data?.description || data?.detail || `Erreur ${response.status}`,
      response.status,
      data?.violations || [],
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getTickets(filters = {}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) {
    if (value !== '' && value !== null && value !== undefined) {
      params.append(key, value)
    }
  }

  const data = await request(`/tickets?${params}`)
  return new CollectionDTO(data, (raw) => new TicketDTO(raw))
}

export async function getTicket(id) {
  const data = await request(`/tickets/${id}`)
  return new TicketDTO(data)
}

export async function createTicket(ticket) {
  const data = await request('/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/ld+json' },
    body: JSON.stringify(ticket),
  })
  return new TicketDTO(data)
}

export async function updateTicket(id, changes) {
  const data = await request(`/tickets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/merge-patch+json' },
    body: JSON.stringify(changes),
  })
  return new TicketDTO(data)
}

export async function deleteTicket(id) {
  await request(`/tickets/${id}`, { method: 'DELETE' })
}