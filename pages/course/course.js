// pages/course/course.js
Page({
  randome_single:function(min, max){
    return Math.floor((max - min + 1) * Math.random()) + min;
  },
  getRandomeArr:function(len, start, end){
    let arr = [];
        while (arr.length < len) {
            let num = Math.floor((Math.random()*end));
            if (arr.indexOf(num) == -1) {
                arr.push(num);
            }
        }
        return arr;
  },
  processData:function(e){
    var tempRec=[]
    var tempHot=[]
    var t=new Object
    for(var i=0;i<this.data.allCourse.length-1;++i){
      // console.log(this.data.allCourse[i].courseInfo)
      if(this.data.allCourse[i].courseInfo.studentList.length>this.data.allCourse[i+1].courseInfo.studentList.length){
        t = this.data.allCourse[i+1]
        this.data.allCourse[i+1] = this.data.allCourse[i]
        this.data.allCourse[i] = t
      }
    }
    for(var i=this.data.allCourse.length-1;i>this.data.allCourse.length-3;--i){
      tempHot.push(this.data.allCourse[i])
    }
    var randIndex = []
    if(this.data.allCourse.length <= 3){
      for(let i = 0;i<this.data.allCourse.length;++i){
        randIndex.push(i)
      }
    }
    else{
      randIndex = this.getRandomeArr(3,0,this.data.allCourse.length-1)
    }
    console.log(randIndex)
    for(var i=0;i<randIndex.length;++i){
      tempRec.push(this.data.allCourse[randIndex[i]])
    }
    this.setData({
      hotCourse:tempHot,
      recommmandCourse:tempRec
    })
    wx.hideLoading({
      success: (res) => {},
    })
  },
  _handleToHotCourse:function(e){
    // console.log(e.currentTarget)
    wx.setStorageSync('tempCInfo', this.data.hotCourse[e.currentTarget.id])
    wx.navigateTo({
      url: '/pages/courseContent/courseContent',
    })
  },
  _handleToRecCourse:function(e){
    // console.log(e.currentTarget.id)
    wx.setStorageSync('tempCInfo', this.data.recommmandCourse[e.currentTarget.id])
    wx.navigateTo({
      url: '/pages/courseContent/courseContent',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    allCourse:[],
    hotCourse:[],
    recommmandCourse:[]
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
      name: 'getAllCourse',
      success: function(res) {
        that.setData({
          allCourse:res.result.data
        })
        that.processData()
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