<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getTicket, updateTicket, deleteTicket, ApiError } from '@/services/ticketService.js'
import TicketUpdateForm from '@/components/TicketUpdateForm.vue'

const props = defineProps({
  id: { type: String, required: true },
})

const router = useRouter()

const ticket = ref(null)
const loading = ref(false)
const error = ref(null)
const saving = ref(false)
const deleting = ref(false)
const message = ref(null)

async function loadTicket() {
  loading.value = true
  error.value = null
  message.value = null
  try {
    ticket.value = await getTicket(props.id)
  } catch (e) {
    console.error('Impossible de charger le ticket :', e)
    error.value = e instanceof ApiError && e.status === 404
      ? `Le ticket #${props.id} n'existe pas.`
      : e.message
  } finally {
    loading.value = false
  }
}

async function onUpdate(changes) {
  saving.value = true
  error.value = null
  message.value = null
  try {
    ticket.value = await updateTicket(props.id, changes)
    message.value = 'Ticket mis à jour.'
  } catch (e) {
    console.error('Impossible de modifier le ticket :', e)
    error.value = e.message
  } finally {
    saving.value = false
  }
}

async function onDelete() {
  if (!confirm(`Supprimer définitivement le ticket #${props.id} ?`)) {
    return
  }
  deleting.value = true
  error.value = null
  try {
    await deleteTicket(props.id)
    router.push({ name: 'dashboard' })
  } catch (e) {
    console.error('Impossible de supprimer le ticket :', e)
    error.value = e.message
    deleting.value = false
  }
}

watch(() => props.id, loadTicket, { immediate: true })
</script>

<template>
  <RouterLink :to="{ name: 'dashboard' }" class="d-inline-block mb-3">
    ← Retour au tableau de bord
  </RouterLink>

  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement…</span>
    </div>
  </div>

  <div v-else-if="error && !ticket" class="alert alert-danger">
    {{ error }}
  </div>

  <template v-else-if="ticket">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="message" class="alert alert-success">{{ message }}</div>

    <article class="card shadow-sm mb-4 border-2" :class="`border-${ticket.priorityColor}`">
      <div class="card-body p-4">
        <div class="d-flex flex-wrap gap-2 mb-2">
          <span class="badge" :class="`text-bg-${ticket.priorityColor}`">
            Priorité : {{ ticket.priorityLabel }}
          </span>
          <span class="badge" :class="`text-bg-${ticket.statusColor}`">
            {{ ticket.statusLabel }}
          </span>
        </div>

        <h1 class="h3">
          <span class="text-body-secondary">#{{ ticket.id }}</span> {{ ticket.title }}
        </h1>
        <p class="text-body-secondary small">Créé le {{ ticket.formattedDate }}</p>

        <h2 class="h6 text-uppercase text-body-secondary mt-4">Description</h2>
        <p class="mb-0" style="white-space: pre-line">{{ ticket.description }}</p>
      </div>
    </article>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="h5 mb-3">Modifier</h2>
        <TicketUpdateForm :ticket="ticket" :loading="saving" @submit="onUpdate" />
      </div>
    </div>

    <div class="card border-danger shadow-sm">
      <div class="card-body d-flex justify-content-between align-items-center gap-3">
        <div>
          <h2 class="h5 text-danger mb-1">Supprimer ce ticket</h2>
          <p class="small text-body-secondary mb-0">Cette action est irréversible.</p>
        </div>
        <button
          type="button"
          class="btn btn-outline-danger"
          :disabled="deleting"
          @click="onDelete"
        >
          {{ deleting ? 'Suppression…' : 'Supprimer' }}
        </button>
      </div>
    </div>
  </template>
</template>