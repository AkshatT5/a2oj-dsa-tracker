<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">A2OJ DSA Tracker</h1>
        <nav class="mt-4">
          <nuxt-link to="/" class="mr-4 text-blue-600 hover:text-blue-800">Home</nuxt-link>
          <nuxt-link to="/dsa" class="mr-4 text-blue-600 hover:text-blue-800">DSA</nuxt-link>
          <nuxt-link to="/a2oj" class="text-blue-600 hover:text-blue-800">A2OJ Ladder</nuxt-link>
        </nav>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
