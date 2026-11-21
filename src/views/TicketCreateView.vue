<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket, ApiError } from '@/services/ticketService.js'
import TicketForm from '@/components/TicketForm.vue'

const router = useRouter()

const saving = ref(false)
const error = ref(null)
const serverErrors = ref({})

async function onSubmit(data) {
  saving.value = true
  error.value = null
  serverErrors.value = {}

  try {
    const ticket = await createTicket(data)
    router.push({ name: 'ticket.show', params: { id: ticket.id } })
  } catch (e) {
    if (e instanceof ApiError && e.violations.length > 0) {
      serverErrors.value = Object.fromEntries(
        e.violations.map((v) => [v.propertyPath, v.message]),
      )
    } else {
      console.error('Impossible de créer le ticket :', e)
      error.value = e.message
    }
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <RouterLink :to="{ name: 'dashboard' }" class="d-inline-block mb-3">
        ← Retour au tableau de bord
      </RouterLink>

      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h1 class="h3 mb-4">Nouveau ticket</h1>

          <div v-if="error" class="alert alert-danger">
            Impossible de créer le ticket : {{ error }}
          </div>

          <TicketForm :loading="saving" :server-errors="serverErrors" @submit="onSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>