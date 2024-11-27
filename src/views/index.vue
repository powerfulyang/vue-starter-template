<script lang="ts" setup>
import { usePostUpload } from '@/orval/service'

const headers = new Headers()

const { isPending: isPendingUpload, mutate: mutateUpload } = usePostUpload({
  request: {
    debug: true,
    headers,
  },
})

const uploadFile1 = ref<File | null>(null)
const uploadFile2 = ref<File | null>(null)
const text = ref('hello')

function onFileChange1(e: Event) {
  uploadFile1.value = (e.target as HTMLInputElement).files?.[0] || null
}
function onFileChange2(e: Event) {
  uploadFile2.value = (e.target as HTMLInputElement).files?.[0] || null
}

function submitUpload() {
  headers.set('custom-header', 'custom-value')
  mutateUpload({
    data: {
      file: [uploadFile1.value!, uploadFile2.value!],
      text: text.value,
    },
    params: {
      id: '1',
      type: 'file',
    },
  })
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
      <div>
        <input type="file" @change="onFileChange1">
        <input type="file" @change="onFileChange2">
        <input v-model="text" type="text">
        <div class="flex items-center gap-2">
          <div
            v-if="isPendingUpload"
            class="i-line-md:loading-twotone-loop h-1em w-1em"
          />
          <span class="cursor-pointer text-blue-5" @click="submitUpload()">
            Click me
          </span>, to upload a file.
        </div>
      </div>
    </div>
  </div>
</template>
