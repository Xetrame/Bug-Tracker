<script setup>
import { onMounted, ref } from 'vue'
import { getTickets } from '@/services/ticketService.js'
import TicketCard from '@/components/TicketCard.vue'
import FilterBar from '@/components/FilterBar.vue'
import PaginationBar from '@/components/PaginationBar.vue'

const collection = ref(null)
const loading = ref(false)
const error = ref(null)

const filters = ref({ title: '', status: '', priority: '' })
const page = ref(1)

async function loadTickets() {
  loading.value = true
  error.value = null
  try {
    collection.value = await getTickets({ ...filters.value, page: page.value })
  } catch (e) {
    console.error('Impossible de charger les tickets :', e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function onSearch(newFilters) {
  filters.value = newFilters
  page.value = 1
  loadTickets()
}

function onPageChange(newPage) {
  page.value = newPage
  loadTickets()
}

onMounted(loadTickets)
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="h3 mb-0">Tableau de bord</h1>
    <span v-if="collection && !loading" class="text-body-secondary">
      {{ collection.total }} ticket(s)
    </span>
  </div>

  <FilterBar @search="onSearch" />

  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement…</span>
    </div>
  </div>

  <div v-else-if="error" class="alert alert-danger">
    Impossible de charger les tickets : {{ error }}
  </div>

  <div v-else-if="!collection || collection.items.length === 0" class="alert alert-info">
    Aucun ticket trouvé.
  </div>

  <template v-else>
    <TicketCard
      v-for="ticket in collection.items"
      :key="ticket.id"
      :ticket="ticket"
    />

    <PaginationBar
      :page="page"
      :total-pages="collection.totalPages"
      @change="onPageChange"
    />
  </template>
</template>