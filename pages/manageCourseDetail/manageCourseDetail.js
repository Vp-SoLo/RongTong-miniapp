// pages/manageCourseDetail/manageCourseDetail.js
Page({
  _handleSubmit:function(e){
    wx.showLoading({
      title: '提交中',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateDetail',
      // 传给云函数的参数
      data: {
        courseID:wx.getStorageSync('tempCourseID'),
        chpDet:this.data.chapterDetail,
        chpT:this.data.chapterTile,
        source:this.data.source
      },
      success: function(res) {
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '操作成功',
            })
          },
        })
      },
      fail: console.error
    })
  },
  _handleAddChapter:function(e){
    console.log(this.data.chapterTile.length)
    this.data.chapterTile.push("第"+String(this.data.chapterTile.length+1)+"章")
    this.setData({
      chapterTile:this.data.chapterTile
    })
    wx.showToast({
      title: '添加成功',
    })
  },
  _handleAddSub:function(e){
    console.log(e.currentTarget.id)
    console.log(this.data.chapterDetail[e.currentTarget.id].length)
    this.data.chapterDetail[e.currentTarget.id].push("第"+String(this.data.chapterDetail[e.currentTarget.id].length+1)+"节")
    this.setData({
      chapterDetail:this.data.chapterDetail
    })
    wx.showToast({
      title: '操作成功',
    })
  },
  _handleAddContent:function(e){
    console.log(e)
    var realIndex = 0
    var tempArray = e.currentTarget.id.split('^')
    var idx1 = this.data.chapterTile.indexOf(tempArray[0])
    if(idx1 == 0){
      realIndex = parseInt(tempArray[1])
    }
    else{
      var idx2 = this.data.chapterDetail[idx1-1].length
      realIndex = idx2+parseInt(tempArray[1])
    }
    //全局资源数组位置索引
    console.log(realIndex)
    wx.setStorageSync('tempGlobalIndex', realIndex)
    wx.navigateTo({
      url: '/pages/manageCourseDetail/addContent/addContent',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    chapterTile:[],
    chapterDetail:[],
    courseContent:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    var tempId = wx.getStorageSync('tempCourseID')
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getCourseDetail',
      // 传给云函数的参数
      data: {
        courseID:tempId,
      },
      success: function(res) {
        // console.log(res)
        that.setData({
          chapterDetail:res.result.data[0].chapterDetail,
          chapterTile:res.result.data[0].chapterTile,
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