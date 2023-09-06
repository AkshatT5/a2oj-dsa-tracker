<template>
  <div>
    <ul class="space-y-4">
      <li v-for="problem in problems" :key="problem.index || problem.number" class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <span :class="{ 'line-through': problem.solved }" class="text-lg font-semibold text-gray-800">
              {{ problem.index || problem.number }}. {{ problem.name || problem.question }}
            </span>
            <div class="flex space-x-2">
              <button @click="toggleTags(problem)" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                Tags
              </button>
              <button @click="toggleNotes(problem)" class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300">
                Notes
              </button>
              <a :href="problem.link || problem.url" target="_blank" class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                Solve
              </a>
              <button @click="toggleSolved(problem)" :class="problem.solved ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'" class="px-3 py-1 text-white rounded-md transition duration-300">
                {{ problem.solved ? 'Unsolved' : 'Solved' }}
              </button>
            </div>
          </div>
          <div v-if="problem.showTags" class="mt-4">
            <div class="flex flex-wrap gap-2">
              <span v-for="(tag, index) in problem.tags" :key="index" class="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center">
                {{ tag }}
                <button @click="removeTag(problem, index)" class="ml-1 text-gray-500 hover:text-gray-700">&times;</button>
              </span>
            </div>
            <div class="flex mt-2">
              <input v-model="newTag" @keyup.enter="addTag(problem)" placeholder="Add new tag" class="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button @click="addTag(problem)" class="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300">
                Add
              </button>
            </div>
          </div>
          <div v-if="problem.showNotes" class="mt-4">
            <textarea v-model="problem.notes" rows="3" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Add notes here..."></textarea>
            <div class="flex justify-between mt-2">
              <button @click="saveNotes(problem)" class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300">
                Save Notes
              </button>
              <button @click="clearNotes(problem)" class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                Clear Notes
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'ProblemList',
  props: {
    problems: {
      type: Array,
      required: true
    }
  },
  emits: ['update-problem'],
  setup(props, { emit }) {
    const newTag = ref('')

    const toggleTags = (problem) => {
      problem.showTags = !problem.showTags
      problem.showNotes = false
    }

    const toggleNotes = (problem) => {
      problem.showNotes = !problem.showNotes
      problem.showTags = false
    }

    const addTag = (problem) => {
      if (newTag.value.trim()) {
        if (!problem.tags) problem.tags = []
        problem.tags.push(newTag.value.trim())
        newTag.value = ''
        emit('update-problem', {...problem})
      }
    }

    const removeTag = (problem, index) => {
      problem.tags.splice(index, 1)
      emit('update-problem', {...problem})
    }

    const saveNotes = (problem) => {
      emit('update-problem', {...problem})
    }

    const clearNotes = (problem) => {
      problem.notes = ''
      emit('update-problem', {...problem})
    }

    const toggleSolved = (problem) => {
      problem.solved = !problem.solved
      emit('update-problem', {...problem})
    }

    return { newTag, toggleTags, toggleNotes, addTag, removeTag, saveNotes, clearNotes, toggleSolved }
  }
}
</script>
