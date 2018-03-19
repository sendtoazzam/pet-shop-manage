{
  var resourceName = 'pet_type'
  var app = new Vue({
    el: '#app',
    data: {
      list: []
    },
    methods: {
      // 获取列表
      fetchList() {
        axios.get(`${window.config.apiPrefix}/${resourceName}/list`).then(({data}) => {
          if(data.errCode == 0) {
            this.list = data.data
          }
        })
      },
      // 编辑
      edit(id) {

      },
      // 删除
      remove(id) {
        axios.delete(`${window.config.apiPrefix}/${resourceName}/${id}`).then(({data}) => {
          if(data.errCode == 0) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.fetchList()
          }
        })
      }
    },
    mounted() {
      this.fetchList()
    }
  })
}