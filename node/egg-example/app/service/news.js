/**
 * Created by qiqf on 2020/7/31
 */
// app/service/news.js
const Service = require('egg').Service

class NewsService extends Service {
  async list(page = 2) {
    return [
      {
        "by": "pseudolus",
        "descendants": 75,
        "id": 24005443,
        "kids": [
          24005533,
          24005796,
          24005601,
          24005600,
          24006048,
          24006159,
          24005507,
          24006197,
          24005514,
          24005513,
          24005599,
          24006063,
          24005571,
          24005881,
          24005576,
          24005855
        ],
        "score": 108,
        "time": 1596167094,
        "title": "An update on our security incident",
        "type": "story",
        "url": "https://blog.twitter.com/en_us/topics/company/2020/an-update-on-our-security-incident.html"
      },
      {
        "by": "segfaultbuserr",
        "descendants": 6,
        "id": 24004640,
        "kids": [
          24006214,
          24005224,
          24005030,
          24005180
        ],
        "score": 78,
        "time": 1596157915,
        "title": "Reverse Engineering the PLA Chip in the Commodore 128",
        "type": "story",
        "url": "https://c128.se/posts/silicon-adventures/"
      }
    ]
  }
}

module.exports = NewsService
