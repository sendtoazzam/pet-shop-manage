Vue.mixin({
  data() {
    return {
      list: [],
      isShowDialog: false,
      actionType: 'add',
      model: {},
      resourceName: ''
    }
  },
  methods: {
    // 获取列表
    fetchList() {
      axios.get(`${window.config.apiPrefix}/${this.resourceName}/list`).then(({data}) => {
        if(data.errCode == 0) {
          this.list = data.data
        }
      })
    },
    // 新增
    add() {
      this.actionType = 'add'
      this.model = {}
      this.isShowDialog = true
    },
    // 编辑
    edit(model) {
      this.actionType = 'edit'
      this.model = model
      this.isShowDialog = true
    },
    // 删除
    remove(id) {
      axios.delete(`${window.config.apiPrefix}/${this.resourceName}/${id}`).then(({data}) => {
        this.handleRes(data, '删除')
      })
    },
    confirm() {
      var data = this.model
      if(this.beforeSubmit) {
        data = this.beforeSubmit(data)
      }
      if(this.actionType === 'add') {
        axios.put(`${window.config.apiPrefix}/${this.resourceName}`, data).then(({data}) => {
          this.handleRes(data, '新增')
        })
      } else {
        axios.post(`${window.config.apiPrefix}/${this.resourceName}/${data.id}`, data).then(({data}) => {
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
    },
    handleSelect(pageName) {
      if(pageName === 'home') {
        return
      }
      location.href = `../${pageName}/index.html`
    }
  },
  
})