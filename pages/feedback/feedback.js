// pages/feedback/feedback.js
const db = wx.cloud.database()
const db_feedback = db.collection("rt_feedback")
const app = getApp();
Page({
  _handleSubmitFeedback:function(e){
    wx.showLoading({
      title: '提交中',
    })
    var t = new Date() 
    var j = 0
    var tt = String(t.getTime())
    this.data.feedback.text = this.data.textareaAValue
    this.data.uploadList.push('rt_feedback_image/'+tt+'0')
    this.data.uploadList.push('rt_feedback_image/'+tt+'1')
    this.data.uploadList.push('rt_feedback_image/'+tt+'2')
    this.data.uploadList.push('rt_feedback_image/'+tt+'3')
    for(;j<this.data.imgList.length;++j){
      wx.cloud.uploadFile({
        cloudPath: this.data.uploadList[j],
        filePath: this.data.imgList[j], // 文件路径
        success: res => {
          // get resource ID
          console.log(res.fileID)
          this.data.feedback.imageID.push(res.fileID)
          db_feedback.add({
            data:{
              feedback:this.data.feedback
              }
          })
          db_feedback.get().then(res=>{
            wx.hideLoading({
              success: (res) => {
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
    imgList: [],
    uploadList:[],
    textareaAValue: '',
    feedback:{
      text:'',
      imageID:[],
    }
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