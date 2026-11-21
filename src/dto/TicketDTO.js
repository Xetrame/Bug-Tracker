import { STATUSES, PRIORITIES } from '@/constants/ticket.js'

function findOption(options, value) {
  return options.find((option) => option.value === value)
}

export class TicketDTO {
  constructor(raw) {
    this.id = raw.id
    this.iri = raw['@id']
    this.title = raw.title
    this.description = raw.description
    this.status = raw.status
    this.priority = raw.priority
    this.createdAt = new Date(raw.createdAt)
  }

  get formattedDate() {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(this.createdAt)
  }

  get statusLabel() {
    return findOption(STATUSES, this.status)?.label ?? this.status
  }

  get statusColor() {
    return findOption(STATUSES, this.status)?.color ?? 'secondary'
  }

  get priorityLabel() {
    return findOption(PRIORITIES, this.priority)?.label ?? this.priority
  }

  get priorityColor() {
    return findOption(PRIORITIES, this.priority)?.color ?? 'secondary'
  }
}