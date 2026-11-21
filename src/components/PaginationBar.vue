<script setup>
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['change'])
</script>

<template>
  <nav v-if="totalPages > 1" aria-label="Pagination">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: page <= 1 }">
        <button
          type="button"
          class="page-link"
          :disabled="page <= 1"
          @click="emit('change', page - 1)"
        >
          « Précédent
        </button>
      </li>
      <li class="page-item active" aria-current="page">
        <span class="page-link">Page {{ page }} / {{ totalPages }}</span>
      </li>
      <li class="page-item" :class="{ disabled: page >= totalPages }">
        <button
          type="button"
          class="page-link"
          :disabled="page >= totalPages"
          @click="emit('change', page + 1)"
        >
          Suivant »
        </button>
      </li>
    </ul>
  </nav>
</template>