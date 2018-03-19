{
  var app = new Vue({
    el: '#app',
    data: {
      resourceName: 'customer'
    },
    methods: {
    },
    mounted() {
      this.fetchList()
    }
  })
}