/**
 * Created by zxf on 2017/8/14.
 */
$(function() {
  $('.jsy').on('click', function(e) {
    console.log($(this).index())
    if ($(this).index() !== 2) {
      $(this).toggleClass('jsy-selected');
    }
  }, false);
  $('.bz-wrap').on('click', function(e) {
    console.log($(this).index())
    if ($(this).index() !== 0) {
      $(this).toggleClass('bz-selected');
    }
  }, false);
  var jys, bz, handleType;
  window.devicePixelRatio === 1 ? handleType = 'click' : handleType = 'tap';
  $('.mask').click(function() {
    $(this).hide(1000);
    $('.mask-con').hide(1000);
  })
  debugger;
  $('.listen').on(handleType, function(e) {

    $('.mask').show();
    $('.mask-con').show();

    jys = $('.jsy-selected').map(function() {
      return $(this).get(0).id;
    }).join(',');
    bz = $('.bz-selected').map(function() {
      return $(this).get(0).id;
    }).join(',');
    // window.location.href = "/tlb/sub/try?exchangeCode=" + jys + "&coinCode=" + bz;
  })
})