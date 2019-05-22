#!/usr/bin/env node
// ./index.js 2:34-2
// Dread it, run from it...
// destiny arrives all the same.

const parser = require('subtitles-parser')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const srt = fs.readFileSync('infinity-war.srt', {encoding: 'utf8'})
const data = parser.fromSrt(srt, true)
const a = argv._[0]

if(a && a.match(/(\d{0,2}):{0,1}(\d{1,2}):(\d{1,2})-{0,1}(\d{0,2})/)) {
  const timeframe = a.match(/(\d{0,2}):{0,1}(\d{1,2}):(\d{1,2})-{0,1}(\d{0,2})/)
  const hoursMs = parseInt(timeframe[1] || 0)*3600000
  const minutesMs = parseInt(timeframe[2])*60000
  const secondsMs = parseInt(timeframe[3])*1000
  const startMs = hoursMs + minutesMs + secondsMs
  const numberOfLines = parseInt(timeframe[4]) || 1
  var parsedLines = 0

  for(let i=0;i<data.length;i++) {
    if(parsedLines < numberOfLines) {
      if(data[i].startTime > startMs) {
        console.log(data[i].text)
        parsedLines++
      }
    } else break
  }
}
else {
  console.log(a.match(/(\d{0,2}):{0,1}(\d{1,2}):(\d{1,2})-{0,1}(\d{0,2})/))
}
