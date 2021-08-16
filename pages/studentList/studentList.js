// pages/studentList/studentList.js
Page({
  processeData:function(e){
    let that = this
    for(var i=0;i<this.data.openidList.length;++i){
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getStudentInfo',
        data:{
          useropenid:that.data.openidList[i]
        },
        success: function(res) {
          // console.log(res.result.data[0])
          that.data.studentList.push(res.result.data[0])
          that.setData({
            studentList:that.data.studentList
          })
        }
      })
      wx.hideLoading({
        success: (res) => {},
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    openidList:[],
    studentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserlCourse',
      data:{
        courseID:wx.getStorageSync('tempCourseID')
      },
      success: function(res) {
        // console.log(res.result.data[0].courseInfo.studentList)
        that.data.openidList = res.result.data[0].courseInfo.studentList
        that.processeData()
      }
    })
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