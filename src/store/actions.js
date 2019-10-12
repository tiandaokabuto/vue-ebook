export default {
  setTest: ({ commit, state }, newTest) => {
    console.log(state.test, newTest)
    commit('SET_TEST', newTest)
  }
}
