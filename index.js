#!/usr/bin/env node
const parser = require('subtitles-parser')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const srt = fs.readFileSync('infinity-war.srt', {encoding: 'utf8'})
const data = parser.fromSrt(srt, true)

if(argv._[0]) {
  if(argv._[0].match(/(\d{1,2}):(\d{1,2}):(\d{1,2})-(\d{1,2})/)) {
    const fromTo = argv._[0].match(/(\d{1,2}):(\d{1,2}):(\d{1,2})-(\d{1,2})/)
    const hoursMs = parseInt(fromTo[1])*3600000
    const minutesMs = parseInt(fromTo[2])*60000
    const secondsMs = parseInt(fromTo[3])*1000
    const startMs = hoursMs + minutesMs + secondsMs
    const numberOfLines = parseInt(fromTo[4]) || 1
    var parsedLines = 0

    // console.log('From')
    console.log(startMs)
    // console.log(hoursMs, minutesMs, secondsMs)
    // console.log(startMs)
    // console.log(data[29].startTime)
    // console.log(data[29].text)

    for(let i=0;i<data.length;i++) {
      if(parsedLines < numberOfLines) {
        if(data[i].startTime > startMs) {
          console.log(data[i].text)
          parsedLines++
        }
      }
      else {
        break
      }
    }
  }
  else if(argv._[0].match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/)) {
    const startMs = ((fromTo[1]*60*60) + (fromTo[2]*60) + fromTo[3])*1000
    console.log('From')
    console.log(startMs)
  }
}
else {
  console.log('argv')
}
