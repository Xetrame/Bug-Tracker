<template>
  <header>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <RouterLink :to="{ name: 'dashboard' }" class="navbar-brand fw-bold">
          Bug-Tracker
        </RouterLink>
        <div class="navbar-nav ms-auto align-items-center gap-2">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="nav-link"
            exact-active-class="active"
          >
            Tableau de bord
          </RouterLink>
          <RouterLink :to="{ name: 'ticket.create' }" class="btn btn-primary btn-sm">
            + Nouveau ticket
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>