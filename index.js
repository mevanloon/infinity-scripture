var parser = require('subtitles-parser')
var fs = require('fs')
var srt = fs.readFileSync('infinity-war.srt', {encoding: 'utf8'})

var data = parser.fromSrt(srt)

console.log(data)
