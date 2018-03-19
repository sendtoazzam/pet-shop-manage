const guidFn = require('../utils/guid')
const apiFormat = require('../utils/apiFormat')
const getUpdateSql = require('../utils/getUpdateSql')
var moment = require('moment')

const tableName = 'pet'
module.exports = {
  list(req, res, pool) {
    pool.query(`SELECT p.*, t.name typeName, c.id customerId, c.name customerName, c.phone customerPhone from ${tableName} p 
        left join pet_type t on p.pet_type_id = t.id
        left join customer c on p.customer_id = c.id
        where p.type = ${req.query.type || 1}
      `, function (error, results, fields) {
      if (error) {
        res.send(apiFormat.error(error));
        return
      }
      res.send(apiFormat.success(results))
    })
  },
  detail(req, res, pool) {
    var sql = `SELECT * from ${tableName} WHERE id = '${req.params.id}'`
    pool.query(sql, function (error, results, fields) {
      if (error) {
        res.send(apiFormat.error(error))
        return
      }
      res.send(apiFormat.success(results))
    })
  },
  add(req, res, pool) {
    var guid = guidFn()
    var body = req.body
    var sql = `INSERT INTO ${tableName} 
    (id, name, type, pet_type_id, status, customer_id, description ) VALUES 
    ('${guid}', '${body.name}', '${body.type}', '${body.pet_type_id}', '${body.status || 1}', '${body.customer_id}', '${body.description}')`
    pool.query(sql, function (error, results, fields) {
      if (error) {
        res.send(apiFormat.error(error))
        return
      }
      res.send(apiFormat.success(results))
    })
  },
  edit(req, res, pool) {
    var updateSql = getUpdateSql(req.body)

    var sql = `UPDATE ${tableName} SET ${updateSql} WHERE id = '${req.params.id}'`
    pool.query(sql, function (error, results, fields) {
      if (error) {
        res.send(apiFormat.error(error));
        return
      }
      res.send(apiFormat.success(results))
    })
  },
  sale(req, res, pool) {
    var vm = this
    var body = req.body
    var sql = `UPDATE ${tableName} SET status = '2', price = ${body.price} WHERE id = '${req.params.id}'`
    pool.query(sql, function (error, results, fields) {
      if (error) {
        res.send(apiFormat.error(error));
        return
      }
      res.send(apiFormat.success(results))
      vm.addMoney(body.price, 1, pool) // 出售
    })
  },
  back(req, res, pool) {
    var vm = this
    var body = req.body
    var sql = `UPDATE ${tableName} SET status = '2', price = ${body.price} WHERE id = '${req.params.id}'`
    pool.query(sql, function (error, results, fields) {
      // TODO 加一笔钱
      if (error) {
        res.send(apiFormat.error(error));
        return
      }
      res.send(apiFormat.success(results))
      vm.addMoney(body.price, 2, pool) // 取回
    })
  },
  addMoney(price,type, pool) {
    var date = moment().format('YYYY-MM-DD hh:mm:ss')
    var guid = guidFn()
    var sql = `INSERT INTO money (id, price, type, date) VALUES ('${guid}', '${price}', '${type}', '${date}')`
    pool.query(sql, function (error, results, fields) {
      if (error) {
        throw error
      }
    })
  },
  remove(req, res, pool) {
    pool.query(`DELETE from ${tableName} where id = '${req.params.id}'`, function (error, results, fields) {
      if (error) {
        res.send(apiFormat.error(error))
        return
      }
      res.send(apiFormat.success(results))
    })
  }
}