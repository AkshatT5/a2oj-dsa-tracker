<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6">A2OJ Ladder</h2>
    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
      <p>{{ error }}</p>
    </div>
    <template v-else>
      <div class="mb-6">
        <label for="division" class="block text-sm font-medium text-gray-700 mb-2">Select Division:</label>
        <select
          id="division"
          v-model="selectedDivision"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="div1D">Division 1 D</option>
          <option value="div1E">Division 1 E</option>
          <option value="div2A">Division 2 A</option>
          <option value="div2B">Division 2 B</option>
          <option value="div2C">Division 2 C</option>
          <option value="div2D">Division 2 D</option>
          <option value="div2E">Division 2 E</option>
        </select>
      </div>
      <div v-if="filteredProblems.length" class="mb-6">
        <p class="text-xl mb-2">Progress:</p>
        <ProgressBar :percentage="progressPercentage" />
      </div>
      <ProblemList :problems="filteredProblems" @update-problem="updateProblem" />
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import ProblemList from '@/components/ProblemList.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { saveProblemUpdates, getProblemUpdates, mergeProblems } from '@/utils/localStorage'

export default {
  name: 'A2OJPage',
  components: { ProblemList, ProgressBar },
  setup() {
    const a2ojProblems = ref({})
    const selectedDivision = ref('div1D')
    const error = ref(null)
    const isLoading = ref(false)

    const filteredProblems = computed(() => {
      return a2ojProblems.value[selectedDivision.value] || []
    })

    const progressPercentage = computed(() => {
      const problems = filteredProblems.value
      const solvedProblems = problems.filter(p => p.solved).length
      return problems.length > 0 ? (solvedProblems / problems.length) * 100 : 0
    })

    const updateProblem = async (updatedProblem) => {
      const problems = a2ojProblems.value[selectedDivision.value]
      const index = problems.findIndex(p => p.index === updatedProblem.index)
      if (index !== -1) {
        Object.assign(problems[index], updatedProblem)
        await saveProblemUpdates('a2oj', selectedDivision.value, problems)
        await nextTick()
      }
    }

    const loadProblemsForDivision = async (division) => {
      isLoading.value = true
      try {
        const storedProblems = await getProblemUpdates('a2oj', division)
        if (a2ojProblems.value[division]) {
          a2ojProblems.value[division] = mergeProblems(a2ojProblems.value[division], storedProblems).map(problem => ({
            ...problem,
            solved: problem.solved || false,
            tags: problem.tags || [],
            notes: problem.notes || '',
            showTags: false,
            showNotes: false
          }))
        }
      } catch (e) {
        console.error('Error loading problems for division:', division, e)
        error.value = `Failed to load problems for ${division}. Please try again later.`
      } finally {
        isLoading.value = false
      }
    }

    onMounted(async () => {
      try {
        const response = await fetch('/data/combined_problems.json')
        if (!response.ok) throw new Error('Failed to fetch A2OJ problems')
        a2ojProblems.value = await response.json()
        await loadProblemsForDivision(selectedDivision.value)
      } catch (e) {
        console.error('Error loading A2OJ problems:', e)
        error.value = 'Failed to load A2OJ problems. Please try again later.'
      }
    })

    watch(selectedDivision, async (newDivision) => {
      await loadProblemsForDivision(newDivision)
    })

    return {
      selectedDivision,
      filteredProblems,
      progressPercentage,
      updateProblem,
      error,
      isLoading
    }
  }
}
</script>
