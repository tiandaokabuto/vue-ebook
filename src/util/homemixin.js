import { mapGetters, mapActions } from 'vuex'

const homeMixin = {
  computed: {
    ...mapGetters(['offsetY', 'hotSearchOffsetY', 'flapCardVisible'])
  },
  methods: {
    ...mapActions(['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible']),
    showBookDetail (book) {

    }
  }
}

export default homeMixin
