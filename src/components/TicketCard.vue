<script setup>
import { TicketDTO } from '@/dto/TicketDTO.js'

defineProps({
  ticket: { type: TicketDTO, required: true },
})
</script>

<template>
  <article class="card mb-3 border-2 shadow-sm" :class="`border-${ticket.priorityColor}`">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-3">
        <h2 class="h5 card-title mb-2">
          <RouterLink
            :to="{ name: 'ticket.show', params: { id: ticket.id } }"
            class="stretched-link text-decoration-none text-body"
          >
            <span class="text-body-secondary">#{{ ticket.id }}</span> {{ ticket.title }}
          </RouterLink>
        </h2>
        <span class="badge" :class="`text-bg-${ticket.priorityColor}`">
          {{ ticket.priorityLabel }}
        </span>
      </div>
      <div class="small text-body-secondary">
        <span class="badge me-2" :class="`text-bg-${ticket.statusColor}`">
          {{ ticket.statusLabel }}
        </span>
        Créé le {{ ticket.formattedDate }}
      </div>
    </div>
  </article>
</template>