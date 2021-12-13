export const state = () => ({
  statesList: null
})

export const getters = {
  giveMeStateList (state) {
    return JSON.parse(JSON.stringify(state.statesList))
  }
}
export const mutations = {
  ADD_STATES_LIST (state, allStatesList) {
    state.statesList = allStatesList
  }
}

export const actions = {
  async fetchAllStates ({ state, commit }) {
    if (!state.statesList) {
      const allStatesList = await this.$axios.$get('/states')
      commit('ADD_STATES_LIST', allStatesList)
    }
  }
}
