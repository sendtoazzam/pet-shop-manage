{
  var app = new Vue({
    el: '#app',
    data() {
      return {
        resourceName: 'pet_type'
      },
    },
    methods: {
    },
    mounted() {
      this.fetchList()
    }
  })
}