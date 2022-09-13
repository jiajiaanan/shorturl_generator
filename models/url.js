const mongoose = require('mongoose')
const Schema = mongoose.Schema //模組
const urlSchema = new Schema({ //新建schema
  randomCode: {
    type: String, // 資料型別是字串
    required: true
  },
  originUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL', urlSchema) //輸出