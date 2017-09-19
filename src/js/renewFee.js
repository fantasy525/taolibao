$(function() {
  //产品框点击变红
  $('.vip-item').click(function() {
      var _this = $(this);
      _this.removeClass('vip-noselect').addClass('vip-select').siblings().removeClass('vip-select').addClass('vip-noselect');
      var eth = _this.children('.money').children('.money-item:nth-of-type(1)').children('span').text();
      var rmb = _this.children('.money').children('.money-item:nth-of-type(2)').children('span').text();
      console.log(eth, rmb);
      $('.pay-num').eq(0).text(eth).end().eq(1).text(rmb)
    })
    //支付方式点击增加对号选中
  $('.pay-icon').click(function() {

      $(this).addClass('pay-icon-sel')
        .parent('.pay-methods')
        .siblings('.pay-methods')
        .children('.pay-icon')
        .removeClass('pay-icon-sel')
    })
    //续费按钮
  var ret = 0.66;
  $('#payBtn').click(function() {
    var month = $('.vip-select').get(0).id;
    var meth = $('.pay-icon-sel').get(0).id;
    $.modal({
      title: '账户余额不足',
      text: '你的可支付余额不足<span>' + 0.66 + 'ETH</span>，请充值后继续支付',
      buttons: [
        { text: "取消", className: "", onClick: function() {} },
        { text: "充值", className: "", onClick: function() {} },
      ]
    });
  })
});