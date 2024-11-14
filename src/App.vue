<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path" />
    </keep-alive>
    <!--    please keep attention to the key, querystring change will not trigger component unmount -->
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path" />
  </router-view>
</template>

<style scoped>
</style>
