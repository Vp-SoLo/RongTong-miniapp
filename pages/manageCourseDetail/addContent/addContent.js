// pages/manageCourseDetail/addContent/addContent.js
const db = wx.cloud.database()
Page({
  _handelVideo:function(e){
    if(e.detail.value){
      wx.showToast({
        title: '功能开发中',
      })
    }
  },
  _handelUpdateContent:function(e){
    wx.showLoading({
      title: '提交中',
    })
    let that = this
    this.data.courseContent[this.data.globalIndex] = ['text', this.data.textareaAValue]
    db.collection("rt_course_detail").where({
      courseID:wx.getStorageSync('tempCourseID')
    }).update({
      data:{
        source:that.data.courseContent
      },
      success:function(e){
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '提交成功',
            })
            wx.navigateBack({
              delta: 1,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          },
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    command:"",
    videoList: [],
    textareaAValue: '',
    vedioMode:false,
    globalIndex:0,
    tempId:''
  },
  ChooseImage() {
    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: 600,
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '亲爱的用户',
      content: '确定要删除吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.globalIndex = wx.getStorageSync('tempGlobalIndex')
    this.data.tempId = wx.getStorageSync('tempCourseID')
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getCourseDetail',
      // 传给云函数的参数
      data: {
        courseID:that.data.tempId,
      },
      success: function(res) {
        // console.log(res)
        that.setData({
          courseContent:res.result.data[0].source
        })
        wx.hideLoading({
          success: (res) => {
            // console.log(that.data.chapterDetail)
          },
        })
      },
      fail: console.error
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