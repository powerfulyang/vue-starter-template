<script lang="ts" setup>
import { usePostHello, usePostUpload } from '@/orval/service'
import { ref } from 'vue'

const { isPending: isPendingTest, mutate: mutateTest } = usePostHello({
  request: {
    debug: true,
    headers: {
      custom: 'value',
    },
  },
})

const { isPending: isPendingUpload, mutate: mutateUpload } = usePostUpload({
  request: {
    debug: true,
  },
})

const uploadFile = ref<File | null>(null)

function onFileChange(e: Event) {
  uploadFile.value = (e.target as HTMLInputElement).files?.[0] || null
}

function submitTest() {
  mutateTest(
    {
      data: { name: 'hello body' },
      params: { name: 'hello params' },
    },
  )
}

function submitUpload() {
  mutateUpload({
    data: {
      file: uploadFile.value!,
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
      <div
        class="flex items-center gap-2"
      >
        <div
          v-if="isPendingTest"
          class="i-line-md:loading-twotone-loop h-1em w-1em"
        />
        <span class="cursor-pointer text-blue-5" @click="submitTest()">
          Click me
        </span>, do a request to the server.
      </div>
    </div>

    <div
      class="mt-4 border border-amber rounded-lg border-dashed p-5"
    >
      <div>
        <input type="file" @change="onFileChange">
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
