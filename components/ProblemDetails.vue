<template>
  <div v-if="problem" class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Problem Details
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        {{ problem.name }}
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Problem Index</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ problem.index }}</dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Link</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <a :href="problem.link" target="_blank" class="text-blue-600 hover:text-blue-800">Solve Problem</a>
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Tags</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input v-model="tags" @change="updateTags" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Add tags (comma-separated)">
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Notes</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <textarea v-model="notes" @change="updateNotes" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <button @click="toggleSolved" :class="problem.solved ? 'bg-green-500' : 'bg-yellow-500'" class="px-3 py-1 rounded text-white">
              {{ problem.solved ? 'Solved' : 'Unsolved' }}
            </button>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import { ref, watch } from '@nuxtjs/composition-api'

export default {
  name: 'ProblemDetails',
  props: {
    problem: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const tags = ref('')
    const notes = ref('')

    watch(() => props.problem, (newProblem) => {
      if (newProblem) {
        tags.value = newProblem.tags || ''
        notes.value = newProblem.notes || ''
      }
    }, { immediate: true })

    const updateTags = () => {
      emit('update', { ...props.problem, tags: tags.value })
    }

    const updateNotes = () => {
      emit('update', { ...props.problem, notes: notes.value })
    }

    const toggleSolved = () => {
      emit('update', { ...props.problem, solved: !props.problem.solved })
    }

    return { tags, notes, updateTags, updateNotes, toggleSolved }
  }
}
</script>
