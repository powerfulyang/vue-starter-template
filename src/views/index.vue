<script lang="ts" setup>
import { usePostHello } from '@/orval/service'

const { isPending, mutate } = usePostHello()

function submit() {
  mutate(
    {
      data: { name: 'hello body' },
      params: { name: 'hello params' },
    },
  )
}
</script>

<template>
  <div class="mx-10 mt-10">
    <hello-world msg="Hello World!" />
    <div
      class="mt-4 border border-amber rounded-lg border-dashed p-5"
    >
      You can use iconify icons by unocss. <br>
      <div class="flex items-center gap-2">
        <div>
          example:
        </div>
        <div class="i-material-symbols:emoticon-rounded h-1em w-1em text-blue" />
      </div>
    </div>

    <div
      class="mt-4 border border-amber rounded-lg border-dashed p-5"
    >
      <div
        class="flex cursor-pointer items-center gap-2"
        @click="submit()"
      >
        <div
          v-if="isPending"
          class="i-line-md:loading-twotone-loop h-1em w-1em"
        />
        <span class="text-blue-5">
          Click me
        </span>, do a request to the server.
      </div>
    </div>
  </div>
</template>
