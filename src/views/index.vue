<script lang="ts" setup>
import { motion } from 'motion-v'
import { usePostWhisperGenerateSubtitle } from '@/orval/service'

const headers = new Headers()

const { isPending: isPendingUpload, mutate: mutateUpload } = usePostWhisperGenerateSubtitle(
  {
    request: {
      debug: true,
      headers,
    },
    mutation: {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      },
    },
  },
)

const uploadFile1 = ref<File | null>(null)
const text = ref('hello')

function onFileChange1(e: Event) {
  uploadFile1.value = (e.target as HTMLInputElement).files?.[0] || null
}

function submitUpload() {
  headers.set('custom-header', 'custom-value')
  mutateUpload({
    data: {
      file: uploadFile1.value!,
      enable_vocal_separation: false,
    },
  })
}
</script>

<template>
  <div class="min-h-screen from-purple-50 to-blue-50 bg-gradient-to-br p-6">
    <div class="mx-auto max-w-4xl">
      <!-- 图标演示卡片 -->
      <motion.div
        :initial="{ opacity: 0, x: -50 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        class="mb-6 overflow-hidden rounded-2xl bg-white shadow-lg"
      >
        <div class="from-amber-400 to-orange-500 bg-gradient-to-r p-4">
          <h2 class="flex items-center gap-2 text-white font-semibold">
            <div class="i-material-symbols:auto-awesome h-1.2em w-1.2em" />
            UnoCSS + Iconify 图标
          </h2>
        </div>
        <div class="p-6">
          <p class="mb-4 text-gray-700">
            你可以通过 UnoCSS 使用 Iconify 图标库中的所有图标
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">示例：</span>
              <motion.div
                :animate="{ rotate: 360 }"
                :transition="{ duration: 2, repeat: Infinity, ease: 'linear' }"
                class="i-material-symbols:emoticon-rounded h-2em w-2em text-blue-500"
              />
            </div>
            <div class="i-carbon-star h-1.5em w-1.5em text-yellow-500" />
            <div class="i-carbon-lightning h-1.5em w-1.5em text-purple-500" />
          </div>
        </div>
      </motion.div>

      <!-- 文件上传卡片 -->
      <motion.div
        :initial="{ opacity: 0, x: 50 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.6, delay: 0.6 }"
        class="overflow-hidden rounded-2xl bg-white shadow-lg"
      >
        <div class="from-green-400 to-blue-500 bg-gradient-to-r p-4">
          <h2 class="flex items-center gap-2 text-white font-semibold">
            <div class="i-carbon-cloud-upload h-1.2em w-1.2em" />
            文件上传演示
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <!-- 文件选择区域 -->
            <div class="relative">
              <label class="mb-2 block text-sm text-gray-700 font-medium">
                选择文件
              </label>
              <div class="relative">
                <input
                  type="file"
                  class="block w-full text-sm text-gray-500 transition-colors file:mr-4 file:border-0 file:rounded-full file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
                  @change="onFileChange1"
                >
              </div>
              <p v-if="uploadFile1" class="mt-2 text-xs text-green-600">
                已选择: {{ uploadFile1.name }}
              </p>
            </div>

            <!-- 文本输入 -->
            <div>
              <label class="mb-2 block text-sm text-gray-700 font-medium">
                文本输入
              </label>
              <input
                v-model="text"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="请输入文本..."
              >
            </div>

            <!-- 上传按钮 -->
            <div class="flex items-center gap-3">
              <motion.button
                :while-hover="{ scale: 1.05 }"
                :while-tap="{ scale: 0.95 }"
                :disabled="!uploadFile1 || isPendingUpload"
                class="flex items-center gap-2 rounded-lg from-blue-500 to-purple-600 bg-gradient-to-r px-6 py-3 text-white font-medium shadow-lg transition-all disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 hover:shadow-xl"
                @click="submitUpload"
              >
                <motion.div
                  v-if="isPendingUpload"
                  :animate="{ rotate: 360 }"
                  :transition="{ duration: 1, repeat: Infinity, ease: 'linear' }"
                  class="i-line-md:loading-twotone-loop h-1em w-1em"
                />
                <div v-else class="i-carbon-upload h-1em w-1em" />
                {{ isPendingUpload ? '上传中...' : '开始上传' }}
              </motion.button>

              <p class="text-sm text-gray-500">
                点击按钮上传文件
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <!-- 动画演示框 -->
      <motion.div
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.8 }"
        class="mt-6 overflow-hidden rounded-2xl bg-white shadow-lg"
      >
        <div class="from-pink-400 to-purple-500 bg-gradient-to-r p-4">
          <h2 class="flex items-center gap-2 text-white font-semibold">
            <div class="i-carbon-play h-1.2em w-1.2em" />
            Motion 动画演示
          </h2>
        </div>
        <div class="p-6">
          <div class="flex flex-wrap gap-4">
            <motion.div
              class="h-16 w-16 rounded-xl from-blue-400 to-purple-500 bg-gradient-to-br shadow-lg"
              :animate="{ rotate: 360 }"
              :transition="{ duration: 3, repeat: Infinity, ease: 'linear' }"
            />
            <motion.div
              class="h-16 w-16 rounded-xl from-green-400 to-blue-500 bg-gradient-to-br shadow-lg"
              :animate="{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }"
              :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }"
            />
            <motion.div
              class="h-16 w-16 rounded-xl from-pink-400 to-red-500 bg-gradient-to-br shadow-lg"
              :animate="{ y: [0, -20, 0] }"
              :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
            />
          </div>
          <p class="mt-4 text-sm text-gray-600">
            这些是使用 motion-v 创建的动画效果演示
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</template>
