import { mapGetters, mapActions } from 'vuex'

const ebookMixin = {
  computed: {
    ...mapGetters(['fileName', 'menuVisible'])
  },
  methods: {
    ...mapActions(['setFileName', 'changeMenuVisible'])
  }
}

export default ebookMixin
