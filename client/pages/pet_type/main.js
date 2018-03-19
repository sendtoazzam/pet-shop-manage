{
  var app = new Vue({
    el: '#app',
    data:{
      resourceName: 'pet_type'
    },
    methods: {
    },
    mounted() {
      this.fetchList()
    }
  })
}