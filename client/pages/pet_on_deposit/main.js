{
  var app = new Vue({
    el: '#app',
    data:{
      resourceName: 'pet',
      petTypeList: [],
      customerTypeList: [],
      typeList: [{
        id: 1,
        label: '出售'
      },{
        id: 2,
        label: '寄养'
      }],
      statusList: [{
        id: 1,
        label: '寄存中'
      },{
        id: 2,
        label: '已领回'
      }],
      backId: null,
      price: null,
      isShowBackDialog: false
    },
    methods: {
      fetchList() {
        axios.get(`${window.config.apiPrefix}/${this.resourceName}/list?type=2`).then(({data}) => {
          if(data.errCode == 0) {
            this.list = data.data
          }
        })
      },
      beforeSubmit(data) {
        var res = Object.assign({}, data)
        res.type = 2 // 寄存
        if(this.actionType === 'add') {
          res.status = 1 // 新增默认是 寄存中
        }
        delete res.typeName
        delete res.status
        delete res.price
        delete res.customerId
        delete res.customerName
        delete res.customerPhone
        return res
      },
      getStatusName(status) {
        return this.statusList.filter(item => item.id == status)[0].label
      },
      back(id) {
        this.price = null
        this.backId = id
        this.isShowBackDialog = true
      },
      deposit(id) {
        axios.post(`${window.config.apiPrefix}/${this.resourceName}/${id}`, {
          status: 1,
          price: 0
        }).then(({data}) => {
          this.handleRes(data, '寄存')
        })
      },
      confirmBack() {
        axios.post(`${window.config.apiPrefix}/${this.resourceName}/back/${this.backId}`,{
          price: this.price
        }).then(({data}) => {
          this.handleRes(data, '领回')
          this.isShowBackDialog = false
        })
      }
    },
    mounted() {
      this.fetchList()

      axios.get(`${window.config.apiPrefix}/pet_type/list`).then(({data}) => {
        if(data.errCode == 0) {
          this.petTypeList = data.data
        }
      })

      axios.get(`${window.config.apiPrefix}/customer/list`).then(({data}) => {
        if(data.errCode == 0) {
          this.customerTypeList = data.data
        }
      })
    }
  })
}