<script setup>
import { computed, reactive, ref } from 'vue'
import { PRIORITIES } from '@/constants/ticket.js'

const props = defineProps({
  loading: { type: Boolean, default: false },
  serverErrors: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: '',
  description: '',
  priority: '',
})

const submitted = ref(false)

const clientErrors = computed(() => {
  const errors = {}
  const title = form.title.trim()
  const description = form.description.trim()

  if (title.length < 3) {
    errors.title = 'Le titre doit contenir au moins 3 caractères.'
  } else if (title.length > 255) {
    errors.title = 'Le titre ne doit pas dépasser 255 caractères.'
  }

  if (description.length < 15) {
    errors.description = 'La description doit contenir au moins 15 caractères.'
  }

  if (!PRIORITIES.some((p) => p.value === form.priority)) {
    errors.priority = 'Choisissez une priorité.'
  }

  return errors
})

const isValid = computed(() => Object.keys(clientErrors.value).length === 0)

function errorFor(field) {
  if (props.serverErrors[field]) {
    return props.serverErrors[field]
  }
  return submitted.value ? clientErrors.value[field] : null
}

function submit() {
  submitted.value = true
  if (!isValid.value) {
    return
  }
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority,
  })
}
</script>

<template>
  <form novalidate @submit.prevent="submit">
    <div class="mb-3">
      <label for="title" class="form-label">Titre</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        maxlength="255"
        class="form-control"
        :class="{ 'is-invalid': errorFor('title') }"
      />
      <div class="invalid-feedback">{{ errorFor('title') }}</div>
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="6"
        class="form-control"
        :class="{ 'is-invalid': errorFor('description') }"
      ></textarea>
      <div class="invalid-feedback">{{ errorFor('description') }}</div>
      <div class="form-text">
        {{ form.description.trim().length }} / 15 caractères minimum
      </div>
    </div>

    <div class="mb-4">
      <label for="priority" class="form-label">Priorité</label>
      <select
        id="priority"
        v-model="form.priority"
        class="form-select"
        :class="{ 'is-invalid': errorFor('priority') }"
      >
        <option value="" disabled>Choisir une priorité</option>
        <option v-for="priority in PRIORITIES" :key="priority.value" :value="priority.value">
          {{ priority.label }}
        </option>
      </select>
      <div class="invalid-feedback">{{ errorFor('priority') }}</div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="loading">
      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
      {{ loading ? 'Création…' : 'Créer le ticket' }}
    </button>
  </form>
</template>