// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"chd-community-1gtwr7tfcd28004c"
})
const db = cloud.database()
const __ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('rt_course').where({
      _id: event.courseID
    })
    .update({
      data: {
        'courseInfo.studentList': __.addToSet(event.studentOpenID)
      },
    })
  } catch(e) {
    console.error(e)
  }
}