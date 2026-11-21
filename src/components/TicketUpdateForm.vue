<script setup>
import { computed, reactive, watch } from 'vue'
import { STATUSES, PRIORITIES } from '@/constants/ticket.js'
import { TicketDTO } from '@/dto/TicketDTO.js'

const props = defineProps({
  ticket: { type: TicketDTO, required: true },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['submit'])

const form = reactive({
  status: '',
  priority: '',
})

watch(
  () => props.ticket,
  (ticket) => {
    form.status = ticket.status
    form.priority = ticket.priority
  },
  { immediate: true },
)

const changes = computed(() => {
  const diff = {}
  if (form.status !== props.ticket.status) {
    diff.status = form.status
  }
  if (form.priority !== props.ticket.priority) {
    diff.priority = form.priority
  }
  return diff
})

const hasChanges = computed(() => Object.keys(changes.value).length > 0)

function submit() {
  if (hasChanges.value) {
    emit('submit', { ...changes.value })
  }
}
</script>

<template>
  <form class="row g-3 align-items-end" @submit.prevent="submit">
    <div class="col-sm-5">
      <label for="status" class="form-label">Statut</label>
      <select id="status" v-model="form.status" class="form-select">
        <option v-for="status in STATUSES" :key="status.value" :value="status.value">
          {{ status.label }}
        </option>
      </select>
    </div>

    <div class="col-sm-5">
      <label for="priority" class="form-label">Priorité</label>
      <select id="priority" v-model="form.priority" class="form-select">
        <option v-for="priority in PRIORITIES" :key="priority.value" :value="priority.value">
          {{ priority.label }}
        </option>
      </select>
    </div>

    <div class="col-sm-2 d-grid">
      <button type="submit" class="btn btn-primary" :disabled="!hasChanges || loading">
        {{ loading ? '…' : 'Enregistrer' }}
      </button>
    </div>
  </form>
</template>