//index.js
//获取应用实例
const app = getApp()

Page({
  randome_single:function(e,min, max){
    return Math.floor((max - min + 1) * Math.random()) + min;
  },
  getRandomeArr:function(e, len, start, end){
    let arr = [];
        while (arr.length < len) {
            let num = random_single(start, end);
            if (arr.indexOf(num) == -1) {
                arr.push(num);
            }
        }
        return arr;
  },
  data: {
    // tempResumeList = [],
    // tempTeacherList = [],
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'cloud://chd-community-1gtwr7tfcd28004c.6368-chd-community-1gtwr7tfcd28004c-1304805216/assets/images/2021.1.25-ad1.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'cloud://chd-community-1gtwr7tfcd28004c.6368-chd-community-1gtwr7tfcd28004c-1304805216/assets/images/2021.1.25-ad2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'cloud://chd-community-1gtwr7tfcd28004c.6368-chd-community-1gtwr7tfcd28004c-1304805216/assets/images/2021.1.25-ad4.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'cloud://chd-community-1gtwr7tfcd28004c.6368-chd-community-1gtwr7tfcd28004c-1304805216/assets/images/2021.1.25-ad3.jpg'
    }],
    allRecommandTeacher:[],
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
  _handleTeacher:function(e){
    // console.log(e.currentTarget.id)
    wx.setStorageSync('tempTInfo', this.data.allRecommandTeacher[e.currentTarget.id])
    wx.navigateTo({
      url: '/pages/teacherContent/teacherContent',
    })
  },
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAllTeacher',
      success: function(res) {
        // console.log(res.result.data)
        var temp = res.result.data
        var tempp = []
        // that.data.tempResumeList = res.result.data
        // that.processData()
        for(let i = 0;i<temp.length;++i){
          if(temp[i].resume.identify=='教师'){
            tempp.push(temp[i])
          }
        }
        // console.log(tempp)
        var randomIndex = []
        if(tempp.length<=3){
          for(let i = 0;i<tempp.length;++i){
            randomIndex.push(i)
          }
        }
        else{
          randomIndex = that.getRandomeArr(len=3,start=0,end=tempp.length-1)
        }
        // console.log(randomIndex)
        for(let i = 0;i<randomIndex.length;++i){
          that.data.allRecommandTeacher.push(tempp[randomIndex[i]])
        }
        wx.hideLoading({
          success: (res) => {
            that.setData({
              allRecommandTeacher:that.data.allRecommandTeacher
            })
          },
        })
      },
      fail: function(res){
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '加载失败!',
            })
          },
        })
      }
    })
  },
})
