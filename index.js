#!/usr/bin/env node
// ./index.js 2:34-2
// Dread it, run from it...
// destiny arrives all the same.

require('dotenv').config()
const Snoowrap = require('snoowrap')
const snoostorm = require('snoostorm')
const botStartTime = Math.floor(new Date() / 1000)
const parser = require('subtitles-parser')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const srt = fs.readFileSync('infinity-war.srt', {encoding: 'utf8'})
const data = parser.fromSrt(srt, true)
const a = argv._[0]

const client = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
})
const comments = new snoostorm.CommentStream(client, {
  subreddit: 'testingground4bots',
  limit: 10,
  pollTime: 2000
})
console.log(botStartTime)
comments.on('item', (comment) => {
  console.log(botStartTime + 28800)
  console.log(comment.created)
  console.log(comment.body)
  if(botStartTime + 28800 < comment.created) {
    // Comment was created after the bot started, so it won't respond
    // more than once. Also Snoowrap/storm has bug that causes the unix-
    // time to be ahead for 8 hours.
    console.log('a new comment has been posted!')
    // const matchedScripture = matchScripture(comment.body)
    // if(matchedScripture) {
    //   console.log("Replying: ", matchedScripture.join("\r\n"))
    //   comment.reply(matchedScripture.join("\r\n"))
    // }
  }
})

function matchScripture(commentString) {
  const a = commentString
  const scriptureRegex = /IW (\d{0,2}):{0,1}(\d{1,2}):(\d{1,2})-{0,1}(\d{0,2})/
  if(a && a.match(scriptureRegex)) {
    const timeframe = a.match(scriptureRegex)
    const hoursMs = parseInt(timeframe[1] || 0)*3600000
    const minutesMs = parseInt(timeframe[2])*60000
    const secondsMs = parseInt(timeframe[3])*1000
    const startMs = hoursMs + minutesMs + secondsMs
    const numberOfLines = parseInt(timeframe[4]) || 1
    var parsedLines = 0
    var returnArr = []

    for(let i=0;i<data.length;i++) {
      if(parsedLines < numberOfLines) {
        if(data[i].startTime > startMs) {
          returnArr.push(data[i].text)
          parsedLines++
        }
      } else break
    }
    return returnArr
  }
  else {
    return null
    // console.log(a.match(scriptureRegex))
  }
}
