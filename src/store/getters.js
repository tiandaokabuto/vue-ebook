const book = {
  fileName: state => state.fileName,
  menuVisible: state => state.menuVisible,
  settingVisible: state => state.settingVisible,
  defaultFontSize: state => state.defaultFontSize,
  defaultFontFamily: state => state.defaultFontFamily,
  fontFamilyVisible: state => state.fontFamilyVisible,
  defaultTheme: state => state.defaultTheme,
  bookAvailable: state => state.bookAvailable,
  progress: state => state.progress,
  section: state => state.section,
  isPaginating: state => state.isPaginating,
  currentBook: state => state.currentBook,
  navigation: state => state.navigation,
  cover: state => state.cover,
  metadata: state => state.metadata,
  paginate: state => state.paginate,
  pagelist: state => state.pagelist,
  offsetY: state => state.offsetY,
  isBookmark: state => state.isBookmark
}
export default book