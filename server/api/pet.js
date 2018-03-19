const guidFn = require('../utils/guid')
const apiFormat = require('../utils/apiFormat')
const getUpdateSql = require('../utils/getUpdateSql')

const tableName = 'pet'
module.exports = {
  list(req, res, pool) {
    pool.query(`SELECT p.*, t.name typeName from ${tableName} p left join pet_type t on p.pet_type_id = t.id`, function (error, results, fields) {
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
    var body = req.body
    var sql = `UPDATE ${tableName} SET status = '2', price = ${body.price} WHERE id = '${req.params.id}'`
    pool.query(sql, function (error, results, fields) {
      // TODO 加一笔钱
      if (error) {
        res.send(apiFormat.error(error));
        return
      }
      res.send(apiFormat.success(results))
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