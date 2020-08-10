const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveGiveClasses} = require('./pages')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})



server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveGiveClasses)
.listen(3333)

console.log(__dirname)