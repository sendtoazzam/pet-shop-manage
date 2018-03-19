{
  var app = new Vue({
    el: '#app',
    data:{
      resourceName: 'pet',
      petTypeList: [],
      typeList: [{
        id: 1,
        label: '出售'
      },{
        id: 2,
        label: '寄养'
      }],
      statusList: [{
        id: 1,
        label: '出售中'
      },{
        id: 2,
        label: '已售出'
      }],
      sellId: null,
      price: null,
      isShowSaleDialog: false
    },
    methods: {
      beforeSubmit(data) {
        var res = Object.assign({}, data)
        res.type = 1 // 出售
        if(this.actionType === 'add') {
          res.status = 1 // 新增默认是 出售中
        }
        delete res.typeName
        delete res.status
        delete res.price
        delete res.customer_id
        return res
      },
      getStatusName(status) {
        return this.statusList.filter(item => item.id == status)[0].label
      },
      sale(id) {
        this.price = null
        this.sellId = id
        this.isShowSaleDialog = true
      },
      confirmSell() {
        axios.post(`${window.config.apiPrefix}/${this.resourceName}/sale/${this.sellId}`,{
          price: this.price
        }).then(({data}) => {
          this.handleRes(data, '出售')
          this.isShowSaleDialog = false
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
    }
  })
}