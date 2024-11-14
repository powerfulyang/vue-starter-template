<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <h1 class="green">
    {{ msg }}
  </h1>
  You can use iconify icons by unocss. <br>
  <div class="flex items-center gap-2">
    <div>
      example:
    </div>
    <div class="i-material-symbols:emoticon-rounded w-1em h-1em text-blue" />
  </div>
</template>
