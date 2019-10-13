export default {
  setFileName: ({ commit, state }, fileName) => {
    commit('SET_FILENAME', fileName)
  },
  changeMenuVisible: ({ commit, state }, menuVisible) => {
    commit('CHANGE_MENU_VISIBLE', menuVisible)
  }
}
