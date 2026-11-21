<script setup>
import { reactive } from 'vue'
import { STATUSES, PRIORITIES } from '@/constants/ticket.js'

const emit = defineEmits(['search'])

const form = reactive({
  title: '',
  status: '',
  priority: '',
})

function submit() {
  emit('search', { ...form })
}

function reset() {
  form.title = ''
  form.status = ''
  form.priority = ''
  submit()
}
</script>

<template>
  <form class="row g-2 mb-4" @submit.prevent="submit">
    <div class="col-md-5">
      <input
        v-model.trim="form.title"
        type="search"
        class="form-control"
        placeholder="Rechercher par titre"
        aria-label="Titre"
      />
    </div>

    <div class="col-6 col-md-2">
      <select v-model="form.status" class="form-select" aria-label="Statut">
        <option value="">Tous les statuts</option>
        <option v-for="status in STATUSES" :key="status.value" :value="status.value">
          {{ status.label }}
        </option>
      </select>
    </div>

    <div class="col-6 col-md-2">
      <select v-model="form.priority" class="form-select" aria-label="Priorité">
        <option value="">Toutes les priorités</option>
        <option v-for="priority in PRIORITIES" :key="priority.value" :value="priority.value">
          {{ priority.label }}
        </option>
      </select>
    </div>

    <div class="col-md-3 d-flex gap-2">
      <button type="submit" class="btn btn-primary flex-fill">Rechercher</button>
      <button type="button" class="btn btn-outline-secondary" @click="reset">
        Réinitialiser
      </button>
    </div>
  </form>
</template>