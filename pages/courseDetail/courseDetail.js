// pages/courseDetail/courseDetail.js
const app = getApp()
Page({
  _handleLearn:function(e){
    console.log(e)
    var realIndex = 0
    var tempArray = e.currentTarget.id.split('-')
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
      url: '/pages/courseDetail/learn/learn',
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    titleList:[],
    subList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
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
      },
      fail: console.error
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserlCourse',
      // 传给云函数的参数
      data: {
        courseID:tempId,
      },
      success: function(res) {
        // console.log(res)
        that.setData({
          courseImage:res.result.data[0].courseInfo.imageList
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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