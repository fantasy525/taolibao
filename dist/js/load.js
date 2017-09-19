/**
 * Created by zxf on 2017/8/14.
 */
$(function () {

    $('.jys-item-wrap').on('click',function (e) {

        $(this).toggleClass('jys-item-sel').children('i').toggleClass('sel-flag')
    },false);
    $('.bz-wrap').on('click',function (e) {
        $(this).toggleClass('jys-item-sel').children('i').toggleClass('sel-flag')
    },false);
})