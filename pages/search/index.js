const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    bookList:null,
    count:0,
    view_show:false
  },

  //  执行搜索
  toSearch:function(e){
    var data = e.detail.value;//  a
    var that=this;

    wx.request({

      url: 'http://laravel_web/api/search/novel',
      data: {name:data.name},
      method: "post",
      dataType: "json",

      success: function (res) {

        if (res.data.code == 2000) {

          that.setData({

            bookList: res.data.data.list,
            count: res.data.data.total_num,
            view_show: true

          })

        }

      }

    })

  },

 
  
  onLoad:function(options){

    wx.showToast({
      title: '努力加载中--',
      icon: "loading",
      duration: 3000
    });

    this.toSearch();

    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    if(options.tag){
      that.setData({bookTag:options.tag})
    }
  },

  
})