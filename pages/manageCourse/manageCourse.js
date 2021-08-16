// pages/manageCourse/manageCourse.js
const db = wx.cloud.database()
const c_resume = db.collection('rt_resume')
const c_user = db.collection('rt_user')
const __ = db.command
Page({
  processData:function(e){
    //处理图片
    for(var i=0;i<this.data.tempCourseInfo.courseInfo.imageList.length;++i){
      var t = new Object
      t.id = i
      t.type = 'image'
      t.url = String(this.data.tempCourseInfo.courseInfo.imageList[i])
      this.data.swiperList.push(t)
    }
    // console.log(this.data.tempCourseInfo._openid)
    c_resume.where({
      _openid:this.data.tempCourseInfo._openid
    }).get().then(res=>{
          // console.log(res)
          var topenid = new String 
          var isIn = false
          topenid = wx.getStorageSync('openid')
          this.data.tempCourseInfo._openid = res.data[0].resume.realName
          for(var i = 0;i<this.data.tempCourseInfo.courseInfo.studentList.length;++i){
            if (this.data.tempCourseInfo.courseInfo.studentList[i] == topenid){
              isIn=true
              break
            }
          }
          if(isIn)
          {
            this.setData({
              attended:true,
              swiperList:this.data.swiperList,
              tempCourseInfo:this.data.tempCourseInfo
            })
            wx.hideLoading({
              success: (res) => {},
            })
          }
          else{
            this.setData({
              swiperList:this.data.swiperList,
              tempCourseInfo:this.data.tempCourseInfo
            })
            wx.hideLoading({
              success: (res) => {},
            })
          }
    })
  },
  _handleAdjustIntro:function(e){
    wx.showToast({
      title: '开发中……',
    })
  },
  _handleManageCourseContent:function(e){
    wx.setStorageSync('tempCourseID', this.data.tempCourseInfo._id)
    wx.navigateTo({
      url: '/pages/manageCourseDetail/manageCourseDetail',
    })
  },
  _handleLookStudentList:function(e){
    wx.setStorageSync('tempCourseID', this.data.tempCourseInfo._id)
    wx.navigateTo({
      url: '/pages/studentList/studentList',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [],
    tempCourseInfo:Object,
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.data.tempCourseInfo = wx.getStorageSync('tempCInfo')
    this.processData()
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