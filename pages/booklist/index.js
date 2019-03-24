const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    bookList:null,//  小说列表数据
    page: 1, // 当前页数据
    total_page: null // 页面总页数
  },


  //  获取书单列表接口
  getNovelList: function () {

    var that = this;

    wx.request({

      url: 'http://laravel_web/api/book/list',
      data: { page:that.data.page },
      method: "get",
      dataType: "json",

      success: function (res) {

        if (res.data.code == 2000) {

          that.setData({

           page: res.data.data.page,
           total_page: res.data.data.total_page

          })

          //  如果是第一页
          if(that.data.page == 1){
            that.setData({
              bookList: res.data.data.list
            })
          }else{
            wx.showToast({
              title: '努力加载中',
              icon: 'loading',
              duration: 3000
            });
            that.setData({
              // 添加一页
              bookList: that.data.bookList.concat(res.data.data.list)
            })
          }

        }

      }

    })

  },

  //  下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    });
    //  调取第一页数据
    this.getNovelList();
  },

  //  上拉刷新
  onReachBottom: function () {

    //  当前为第一页时
    if(this.data.page >= this.data.total_page){
      wx.showToast({
        title: '没有更多数据',
        icon: "warn",
        duration: 3000
      })
      return false;
    }

    //  当前页面 +1
    this.setData({
      page: this.data.page+1
    });

    //  调取显示页面
    this.getNovelList();

  },
  
  onLoad:function(options){
    this.getNovelList();
  },
  onUnload:function(){
    // 页面关闭
  }

  
})