<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6">DSA Questions</h2>
    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
      <p>{{ error }}</p>
    </div>
    <template v-else>
      <div v-if="dsaProblems.length" class="mb-6">
        <p class="text-xl mb-2">Progress:</p>
        <ProgressBar :percentage="progressPercentage" />
      </div>
      <ProblemList :problems="dsaProblems" @update-problem="updateProblem" />
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from '@nuxtjs/composition-api'
import ProblemList from '@/components/ProblemList.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { saveProblemUpdates, getProblemUpdates } from '@/utils/localStorage'

export default {
  name: 'DSAPage',
  components: { ProblemList, ProgressBar },
  setup() {
    const dsaProblems = ref([])
    const error = ref(null)

    const progressPercentage = computed(() => {
      const solvedProblems = dsaProblems.value.filter(p => p.solved).length
      return dsaProblems.value.length > 0 ? (solvedProblems / dsaProblems.value.length) * 100 : 0
    })

    const updateProblem = (updatedProblem) => {
      const index = dsaProblems.value.findIndex(p => p.number === updatedProblem.number)
      if (index !== -1) {
        dsaProblems.value[index] = reactive({ ...updatedProblem })
        saveProblemUpdates('dsa', 'all', dsaProblems.value)
      }
    }

    onMounted(async () => {
      try {
        const response = await fetch('/data/dsa_questions.json')
        if (!response.ok) throw new Error('Failed to fetch DSA questions')
        const fetchedProblems = await response.json()
        const storedProblems = getProblemUpdates('dsa', 'all') || []

        dsaProblems.value = fetchedProblems.map(problem => {
          const storedProblem = storedProblems.find(p => p.number === problem.number) || {}
          return reactive({
            ...problem,
            solved: storedProblem.solved || false,
            tags: storedProblem.tags || [],
            notes: storedProblem.notes || '',
            showTags: false,
            showNotes: false
          })
        })
      } catch (e) {
        console.error('Error loading DSA questions:', e)
        error.value = 'Failed to load DSA questions. Please try again later.'
      }
    })

    return { dsaProblems, progressPercentage, updateProblem, error }
  }
}
</script>
