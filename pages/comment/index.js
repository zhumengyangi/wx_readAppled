// pages/comment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novel_id: 0, // 小说id
    comment_list: [] // 评论列表
  },

  //  添加评论接口
  addComment: function(e){
    
    // console.log(e.detail.value);
    var that = this;
    var params = e.detail.value;
    // console.log(e.detail.value);
    params.novel_id = this.data.novel_id;
    
    params.user_id = 1;

    console.log(params);

    wx.request({
      url: 'http://laravel_web/api/comment/add',
      method: "post",
      data: params,
      dataType: "json",
      
      success: function(res){
        if(res.data.code == 2000){
          wx.showToast({
            title: '评论成功',
            duration: 2000
          })
          that.getList();
        }
      }

    })

  },

  //  评论列表接口
  getList: function()
  {
    var that = this;
    console.log(that.data.username);
    wx.request({
      url: 'http://laravel_web/api/comment/list/'+that.data.novel_id,
      method: "post",
      data: {},
      dataType: "json",

      success: function (res) {
        if (res.data.code == 2000) {
          that.setData({
            comment_list: res.data.data
          })

        }
      }

    })
    
  },

  //  小说删除接口
  del:function(e){
    var id = e.currentTarget.id;
    console.log(id);
    
    var that = this;
    wx.request({
      url: 'http://laravel_web/api/comment/del/'+ id,
      method: "post",
      data: {},
      dataType: "json",

      success: function (res) {
        if (res.data.code == 2000) {
         wx.showToast({
           title: '删除成功',
           duration: 2000,
         })
          that.getList();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    console.log(options);
    this.setData({
      novel_id: options.novel_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.getList();

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