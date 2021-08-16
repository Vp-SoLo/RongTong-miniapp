// pages/resume/resume.js
const db = wx.cloud.database()
const db_resume = db.collection("rt_resume")
const app = getApp();
Page({
  _handleSubmitResume:function(e){
    wx.showLoading({
      title: '提交中',
    })
    var j = 0
    this.data.resume.openid = wx.getStorageSync('openid')
    this.data.resume.mainRegion=e.detail.value.mainRegion
    this.data.resume.major=e.detail.value.major
    this.data.resume.phone=e.detail.value.phone
    this.data.resume.realName=e.detail.value.realName
    this.data.resume.school=e.detail.value.school
    this.data.resume.gender=this.data.genderCurrent
    this.data.resume.identify=this.data.identifyCurrent
    this.data.resume.birthday=this.data.date
    this.data.resume.homeInChina=this.data.region[0]+this.data.region[1]+this.data.region[2]
    this.data.resume.intro=this.data.textareaAValue
    this.data.uploadList.push('rt_user_image/'+this.data.resume.openid+'0')
    this.data.uploadList.push('rt_user_image/'+this.data.resume.openid+'1')
    this.data.uploadList.push('rt_user_image/'+this.data.resume.openid+'2')
    this.data.uploadList.push('rt_user_image/'+this.data.resume.openid+'3')
    for(;j<this.data.imgList.length;++j){
      wx.cloud.uploadFile({
        cloudPath: this.data.uploadList[j],
        filePath: this.data.imgList[j], // 文件路径
        success: res => {
          // get resource ID
          console.log(res.fileID)
          this.data.resume.imageID.push(res.fileID)
          db_resume.add({
            data:{
              resume:this.data.resume
              }
          })
          db_resume.get().then(res=>{
            wx.hideLoading({
              success: (res) => {
            wx.setStorageSync('resume', this.data.resume)
            wx.showModal({
              title:"提示",
              content:"提交成功",
              success(res){
                if(res.confirm){
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }
            })
              },
            })
          })
        },
        fail: err => {
          // handle error
        }
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    resume:{
     openid:'',
     mainRegion: "",
     major: "",
     phone: "",
     realName: "",
     school: "",
     gender:'',
     identify:'',
     birthday:'',
     homeInChina:'',
     imageID:[],
     intro:''
    },
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gender:['男','女'],
    identify:['教师','普通用户'],
    date: '2018-12-25',
    region: ['陕西省', '西安市', '未央区'],
    imgList: [],
    uploadList:[],
    textareaAValue: '',
    genderCurrent:'',
    identifyCurrent:'',
  },
  genderPickerChange(e) {
    console.log(e);
    this.setData({
      genderCurrent:this.data.gender[e.detail.value]
    })
  },
  identifyPickerChange(e) {
    console.log(e);
    this.setData({
      identifyCurrent:this.data.identify[e.detail.value]
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
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