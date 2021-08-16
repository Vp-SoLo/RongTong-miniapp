// pages/myCourse/myCourse.js
const db = wx.cloud.database()
const db_course = db.collection("rt_course")
const c_user = db.collection("rt_user")
const app = getApp();
Page({
  processData:function(e){
    let that = this
    for(var i = 0;i<this.data.tempUserInfo[0].courseList.length;++i){
      // console.log(this.data.tempUserInfo[0].courseList[i])
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getUserlCourse',
        data:{
          courseID:this.data.tempUserInfo[0].courseList[i],
        },
        success: function(res) {
          console.log(res.result.data[0])
          that.data.myCourse.push(res.result.data[0])
        }
      })
    }
  },
  _handleToManageCourse:function(e){
    wx.setStorageSync('tempCInfo', this.data.myCourse[e.currentTarget.id])
    wx.navigateTo({
      url: '/pages/manageCourse/manageCourse',
    })
  },
  _handleToCourse:function(e){
    wx.setStorageSync('tempCInfo', this.data.myCourse[e.currentTarget.id])
    wx.navigateTo({
      url: '/pages/courseContent/courseContent',
    })
  },
  _handleAdd:function(e){
    wx.navigateTo({
      url: '/pages/addCourse/addCourse',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    resume:Object,
    myCourse:[],
    tempUserInfo:Object,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resume:wx.getStorageSync('resume')
    })
    // console.log(this.data.resume.identify)
    if(this.data.resume.identify == '教师'){
      db_course.get({
        success:res=>{
          console.log(res.data)
          this.setData({
            myCourse:res.data
          })
        }
      })
    }
    else{
      c_user.get({
        success:res=>{
          // console.log(res.data)
          this.setData({
            tempUserInfo:res.data
          })
          this.processData()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})