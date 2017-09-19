/**
 * Created by Administrator on 2016/9/28.
 */


(function ($, window) {
           window.addEventListener('DOMContentLoaded', function () {
               var shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';
               var timer = null;

               //设置字体
               function setFontSize() {
                   var w = document.documentElement.clientWidth || document.body.clientWidth;
                   debugger
                   document.documentElement.style.fontSize = parseInt(100 * w / 750) + 'px';
               }
               setFontSize();
               window.addEventListener(shuping, function () {
                   clearTimeout(timer);
                   timer = setTimeout(setFontSize, 300);
               }, false);
           }, false);
       })($, window);