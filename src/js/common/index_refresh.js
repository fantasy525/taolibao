(function() {
  var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

  function loaded() {
    //动画部分
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    // pullUpEl = document.getElementById('pullUp');
    // pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll('loadmore', {
      useTransition: true,
      topOffset: pullDownOffset,
      onRefresh: function() {
        if (pullDownEl.className.match('loading')) {
          pullDownEl.className = '';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
        }
      },
      onScrollMove: function() {
        console.log(this.y, this.maxScrollY + 5, this.maxScrollY - 5)
        if (this.y > 5 && !pullDownEl.className.match('flip')) {
          pullDownEl.className = 'flip pull-up';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新';
          this.minScrollY = 0;
        } else if (this.y < 5 && pullDownEl.className.match('flip')) {
          pullDownEl.className = '';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
          this.minScrollY = -pullDownOffset;
        }
      },
      onScrollEnd: function() {
        if (pullDownEl.className.match('flip')) {
          pullDownEl.className = 'loading refreshing';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';
          pullDownAction(); // Execute custom function (ajax call?)
        }
      }
    });
    myScroll.refresh();
  }
  document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false); //阻止冒泡
  window.onload = function() {
    setTimeout(loaded, 100)
  }

  //初始状态，加载数据
  function loadAction() {
    // var el, li;
    // el = document.getElementById('thelist');
    // for (i = 0; i < 10; i++) {
    //   li = document.createElement('li');
    //   li.innerText = '初始数据--' + (++generatedCount);
    //   el.appendChild(li, el.childNodes[0]);
    // }

  }
  //下拉刷新当前数据
  function pullDownAction() {
    setTimeout(function() {
      //这里执行刷新操作
      setTimeout(function() {
        myScroll.refresh();
      }, 2000)

    }, 400);
  }
  //上拉加载更多数据
  // function pullUpAction() {
  //   setTimeout(function () {
  //     var el, li;
  //    for (i = 0; i < 10; i++) {
  //      $('.records').append('  <li class="lists-item mtop28">\n' +
  //          '                        <div class="item-con flex">\n' +
  //          '                            <div class="buy">\n' +
  //          '                                <p class="title">买入建议</p>\n' +
  //          '                                <p class="item-num">￥<span class="fh">17400.65</span> </p>\n' +
  //          '                                <p class="item-time">08/04 14:16:20</p>\n' +
  //          '                            </div>\n' +
  //          '                            <div class="sell">\n' +
  //          '                                <p class="title">买入建议</p>\n' +
  //          '                                <p class="item-num">￥<span class="fh">17400.65</span> </p>\n' +
  //          '                                <p class="item-time">08/04 14:16:20</p>\n' +
  //          '                            </div>\n' +
  //          '                            <div class="rate">\n' +
  //          '                                <p class="title">盈利率</p>\n' +
  //          '                                <p class="item-num">3.8%</p>\n' +
  //          '                            </div>\n' +
  //          '                        </div>\n' +
  //          '                    </li>')
  //     }
  //     myScroll.refresh();
  //   }, 1000);
  // }
})();