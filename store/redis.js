const redis = require('redis')

redis.RedisClient.prototype.existsAsync = function(key) {
  return new Promise((resolve, reject) => {
    this.exists(key, function(err, value) {
      if (err) return reject(err)
      resolve(value == 1)
    })
  })
}

redis.RedisClient.prototype.getAsync = function(key, defaultVal = null) {
  return new Promise((resolve, reject) => {
    this.get(key, function(err, value) {
      if (err) return reject(err)
      resolve(value || defaultVal)
    })
  })
}

redis.RedisClient.prototype.hgetallAsync = function(key, defaultVal = null) {
  return new Promise((resolve, reject) => {
    this.hgetall(key, function(err, value) {
      if (err) return reject(err)
      resolve(value || defaultVal)
    })
  })
}

redis.RedisClient.prototype.hmsetex = function(hash, timeout, obj, cb) {
  return this.hmset(hash, obj, (err, data) => {
    if (!err) {
      this.expire(hash, timeout)
    }
    if (cb) {
      cb(err, data)
    }
  })
}

redis.RedisClient.prototype.zrangeScoreAsync = function(key, start, stop) {
  return new Promise((resolve, reject) => {
    this.zrange(key, start, stop, 'WITHSCORES', (err, data) => {
      if (err) return reject(err)
      const range = []
      for (let i = 0; i < data.length; i += 2) {
        range.push({
          member: data[i],
          score: data[i + 1]
        })
      }
      resolve(range)
    })
  })
}

redis.RedisClient.prototype.zrevrangeScoreAsync = function(key, start, stop) {
  return new Promise((resolve, reject) => {
    this.zrevrange(key, start, stop, 'WITHSCORES', (err, data) => {
      if (err) return reject(err)
      const range = []
      for (let i = 0; i < data.length; i += 2) {
        range.push({
          member: data[i],
          score: data[i + 1]
        })
      }
      resolve(range)
    })
  })
}

module.exports = redis.createClient()
module.exports.redis = redis
