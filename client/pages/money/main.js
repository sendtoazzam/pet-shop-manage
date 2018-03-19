{
  var app = new Vue({
    el: '#app',
    data: {
      resourceName: 'money',
      typeList: [{
        id: 1,
        label: '出售'
      },{
        id: 2,
        label: '寄养'
      }],
    },
    computed: {
      total() {
        return this.list.reduce((curr, prev) => {
          return prev.price + curr
        }, 0)
      }
    },
    methods: {
      getTypeName(type) {
        return this.typeList.filter(item => item.id == type)[0].label
      },
    },
    mounted() {
      this.fetchList()
    }
  })
}