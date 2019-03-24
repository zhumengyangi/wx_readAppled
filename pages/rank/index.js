const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    read_rank: []
  },

  //  获取阅读榜单接口数据
  getReadRank: function() {

    var that = this;

    wx.request({
// 错11111111111111111111111111111111
      url: 'http://laravel_web/api/read/read/rank',
      data: { num: 8},
      method: "post",
      dataType: "json",

      success: function (res) {

        if (res.data.code == 2000) {

          that.setData({

            read_rank: res.data.data

          })

        }

      }

    })
  },

 
   // 页面初始化 options为页面跳转所带来的参数
  onLoad:function(options){

    this.getReadRank();

    wx.showToast({
      title: '努力加载中--',
      icon: "loading",
      duration: 3000
    });

   

  },
   

  
})