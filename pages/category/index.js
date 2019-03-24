const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    bookList:null, // 小说列表
    category: [], //  分类
    c_id:1        //  当期选中的小说分类
  },

 //点击搜索分类
 getCategory: function(e){
   this.setData({
     c_id:e.currentTarget.id
   })
   this.novelList();
 },

 // 获取分类列表接口
 categoryList: function(){

   var that = this;

   wx.request({

     url: 'http://laravel_web/api/category/list',
     data: {},
     method: "post",
     dataType: "json",

     success: function (res) {
       
       if (res.data.code == 2000) {

         that.setData({

           category: res.data.data,
           c_id: res.data.data[0].id

         })

       }

     }

   })

 },

 // 获取分类小说的接口
  novelList: function () {

    var that = this;

    wx.request({

      url: 'http://laravel_web/api/category/novel',
      data: {c_id: that.data.c_id},
      method: "post",
      dataType: "json",

      success: function (res) {

        if (res.data.code == 2000) {

          that.setData({

            bookList: res.data.data,

          })

        }

      }

    })

  },

  onLoad:function(options){

    //  需要放在最上面
    wx.showToast({
      title: '努力加载中',
      icon: 'loading',
      duration: 5000
    });

   
    this.categoryList();   //  分类接口
    this.novelList();       //  分类小说列表

    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    if(options.tag){
      that.setData({bookTag:options.tag})
    }
  },
   

  
})