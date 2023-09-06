export const saveProblemUpdates = (problemType, division, problems) => {
  const key = `${problemType}-${division}`
  localStorage.setItem(key, JSON.stringify(problems))
}

export const getProblemUpdates = (problemType, division) => {
  const key = `${problemType}-${division}`
  const storedData = localStorage.getItem(key)
  return storedData ? JSON.parse(storedData) : null
}

export const clearAllData = () => {
  localStorage.clear()
}

export const mergeProblems = (fetchedProblems, storedProblems) => {
  if (!storedProblems) return fetchedProblems

  return fetchedProblems.map(problem => {
    const storedProblem = storedProblems.find(p => p.index === problem.index)
    return storedProblem ? { ...problem, ...storedProblem } : problem
  })
}
