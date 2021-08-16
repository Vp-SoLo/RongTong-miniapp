// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"chd-community-1gtwr7tfcd28004c"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event)
  try {
    return await db.collection('rt_course').where({
      _openid: event.teacherOpenID
    })
    .get()
  } catch(e) {
    console.error(e)
  }
}