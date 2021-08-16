const cloud = require('wx-server-sdk')
cloud.init({
  env:"chd-community-1gtwr7tfcd28004c"
})
const db = cloud.database()
const __ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('rt_course_detail').where({
      courseID: event.courseID
    })
    .update({
      data: {
        'chapterDetail': __.set(event.chpDet),
        'chapterTile':__.set(event.chpT),
        'source':__.set(event.source)
      },
    })
  } catch(e) {
    console.error(e)
  }
}