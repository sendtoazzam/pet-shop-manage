{
  var resourceName = 'pet_type'
  var app = new Vue({
    el: '#app',
    data: {
      list: [],
      isShowDialog: false,
      type: 'add',
      model: {},
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
      // 新增
      add() {
        this.type = 'add'
        this.model = {}
        this.isShowDialog = true
      },
      // 编辑
      edit(model) {
        this.type = 'edit'
        this.model = model
        this.isShowDialog = true
      },
      // 删除
      remove(id) {
        axios.delete(`${window.config.apiPrefix}/${resourceName}/${id}`).then(({data}) => {
          this.handleRes(data, '删除')
        })
      },
      confirm() {
        var data = this.model
        if(this.type === 'add') {
          axios.put(`${window.config.apiPrefix}/${resourceName}`, data).then(({data}) => {
            this.handleRes(data, '新增')
          })
        } else {
          axios.post(`${window.config.apiPrefix}/${resourceName}/${data.id}`, data).then(({data}) => {
            this.handleRes(data, '编辑')
          })
        }
      },
      handleRes(data, opName) {
        if(data.errCode == 0) {
          this.$message({
            message: `${opName}成功!`,
            type: 'success'
          })
          this.fetchList()
          this.isShowDialog = false
        }
      }
    },
    mounted() {
      this.fetchList()
    }
  })
}