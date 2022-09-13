const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')
const URL = require('./models/url')
const generateCode = require('./generate_code')

const app = express()
const port = 3000

// require packages used in the project
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定 body-parser
app.use(express.urlencoded({ extended: true }))

//首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

//提交產生隨機碼、新增一筆資料（條件篩選不重複）、導向show頁面、顯示短網址結果
app.post('/', (req, res) => {
  const originUrlFromInput = req.body.origin_url
  const code = generateCode()
  console.log(originUrlFromInput)

  //若此原網址已存在則顯示既有短網址資料
  URL.exists({ originUrl: originUrlFromInput }, function (err, result) {
    //Create New Url
    if (result === null) {
      URL.create({
        randomCode: code,
        originUrl: originUrlFromInput,
      })
      console.log('url created')
      return res.render('show', { code: code })

    } else {
      //Show existed short-url
      console.log('this URL already exist', result)
      URL.find()
        .lean()
        .then(urls => urls.filter(url => url.originUrl === originUrlFromInput))
        .then(urls => res.render('show', { code: urls[0].randomCode }))
        .catch(error => console.error(error))
    }
  })

})

//設定短網址路由 從隨機馬找到該筆資料資料 導向原始網址
app.get('/:code', (req, res) => {
  const code = req.params.code
  console.log(code)
  URL.find()
    .lean()
    .then(urls => urls.filter(url => url.randomCode === code))
    .then(urls => res.redirect(urls[0].originUrl))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log('http://localhost:3000/ connected')
})