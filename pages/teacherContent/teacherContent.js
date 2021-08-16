// pages/teacherContent/teacherContent.js
const db = wx.cloud.database()
const c_resume = db.collection('rt_resume')
Page({
  processData:function(e){
    c_resume.where({
      _openid:this.data.tempTeacherInfo.teacherOpenID
    }).get().then(res=>{
          console.log(res)
          this.data.detailInfo = res.data[0].resume
           //处理图片
          for(var i=0;i<this.data.detailInfo.imageID.length;++i){
          var t = new Object
          t.id = i
          t.type = 'image'
          t.url = String(this.data.detailInfo.imageID[i])
          this.data.swiperList.push(t)
          }
          this.setData({
            swiperList:this.data.swiperList,
            tempTeacherInfo:this.data.tempTeacherInfo,
            detailInfo:this.data.detailInfo
          })
    })
  },
  _handleChat:function(e){
    wx.showToast({
      title: '开发中……',
    })
  },
  _handleChackCourse:function(e){
    wx.navigateTo({
      url: '/pages/teacherCourseList/teacherCourseList',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [],
    tempTeacherInfo:Object,
    detailInfo:Object
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
    this.data.tempTeacherInfo = wx.getStorageSync('tempTInfo')
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