/**
 * Created by qiqf on 2020/8/1
 */
exports.index = async ctx => {
  const type = ctx.query.type
  const q = ctx.query.q || 'node.js'

  if (type === 'bing') {
    ctx.redirect(`http://cn.bing.com/search?q=${q}`)
  } else {
    ctx.redirect(`https://www.google.co.kr/search?q=${q}`)
  }
}

