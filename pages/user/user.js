// pages/user/user.js
const db = wx.cloud.database()
Page({
  _handleChat:function(e){
    wx.showToast({
      title: '开发中',
    })
  },
  _handleReview:function(e){
    wx.showToast({
      title: '开发中',
    })
  },
  _handleHistory:function(e){
    wx.showToast({
      title: '开发中',
    })
  },
  _handleLogout:function(e){
    wx.showModal({
      title: '提示',
      content: '是否清除缓存并注销！',
      success (res) {
        if (res.confirm) {
          wx.clearStorage({
            success: (res) => {
              wx.showToast({
                title: '操作成功',
              })
              this.onLoad()
            },
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消操作',
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    isLogged:false,
    openid:'',
    id:'',
    userInfo:Object,
    resume:Object,
  },
  _handleFeedback:function(e){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  _handleLoginOrReg:function(e){
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于登录或注册', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo,
        })
        wx.cloud.callFunction({
          name:"login",
          success:res=>{
            // console.log(res)
            this.setData({
              openid:res.result.openid
            })
            wx.setStorageSync('openid', res.result.openid)
            this.data.userInfo.openid = this.data.openid
            // this.data.userInfo.push({
            //   key:'openid',
            //   value:this.data.openid
            // })
            wx.setStorageSync("userInfo",this.data.userInfo)
            const user = db.collection("rt_user")
            user.add({
              data:{
                openid:this.openid,
                nickName:this.data.userInfo.nickName,
                avatar:this.data.userInfo.avatarUrl,
                courseList:[]
                }
              })
              user.get().then(res=>{
                this.setData({
                  id:res.data[0]._id,
                })
                wx.setStorageSync('databaseID', this.data.id)
                // wx.setStorageSync('student', this.data.studentInfo)
                this.setData({
                  isLogged:true
                })
              })
            },
            fail:res=>{
            wx.showToast({
              title: '登陆失败',
            })
          }
        })
      }
    })
  },
  _handleMyCourse:function(e){
    wx.navigateTo({
      url: '/pages/myCourse/myCourse',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  _handleResume:function(e){
    wx.navigateTo({
      url: '/pages/resume/resume',
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync("userInfo")) {
      this.setData({
        userInfo:wx.getStorageSync('userInfo'),
        isLogged:true
      })
      if(!wx.getStorageSync('resume')){
        wx.showModal({
          title:"提示",
          content:"您还没有完善简历，请前往完善",
          success(res){
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/resume/resume',
              })
            }
          }
        })
      }
    } else {
      wx.showModal({
        title:"提示",
        content:"您还没有登录，请点击名片登录",
        success(res){
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