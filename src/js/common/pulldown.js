(function() {
  var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

  function loaded() {
    //动画部分
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll('loadmore', {
      topOffset: pullDownOffset,
      useTransition: true,
      onRefresh: function() {
        if (pullDownEl.className.match('loading')) {
          pullDownEl.className = '';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
        } else
        if (pullUpEl.className.match('loading')) {
          pullUpEl.className = '';
          pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
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
        } else
        if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
          pullUpEl.className = 'flip pull-up';
          pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载更多';
          this.maxScrollY = this.maxScrollY;
        } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
          pullUpEl.className = '';
          pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
          this.maxScrollY = pullUpOffset;
        }
      },
      onScrollEnd: function() {
        if (pullDownEl.className.match('flip')) {
          pullDownEl.className = 'loading refreshing';
          pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';
          pullDownAction(); // Execute custom function (ajax call?)
        } else
        if (pullUpEl.className.match('flip')) {
          pullUpEl.className = 'loading refreshing';
          pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';
          pullUpAction(); // Execute custom function (ajax call?)
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
  //下拉刷新当前数据
  function pullDownAction() {
    setTimeout(function() {
      //这里执行刷新操作
      window.location.reload();
    }, 400);
  }

  //上拉加载更多数据
  function pullUpAction() {
    /*    setTimeout(function () {
            pullUpEl.className='';
            pullUpEl.querySelector('.pullUpLabel').innerHTML="暂无更多数据"


        },1000)*/

    setTimeout(function() {
      var el, li;
      for (i = 0; i < 10; i++) {
        $('.records').append('  <li class="lists-item mtop28">\n' +
          '                        <div class="item-con flex">\n' +
          '                            <div class="buy">\n' +
          '                                <p class="title">买入建议</p>\n' +
          '                                <p class="item-num">￥<span class="fh">17400.65</span> </p>\n' +
          '                                <p class="item-time">08/04 14:16:20</p>\n' +
          '                            </div>\n' +
          '                            <div class="sell">\n' +
          '                                <p class="title">买入建议</p>\n' +
          '                                <p class="item-num">￥<span class="fh">17400.65</span> </p>\n' +
          '                                <p class="item-time">08/04 14:16:20</p>\n' +
          '                            </div>\n' +
          '                            <div class="rate">\n' +
          '                                <p class="title">本次盈利</p>\n' +
          '                                <p class="item-num">3.8%</p>\n' +
          '                            </div>\n' +
          '                        </div>\n' +
          '                    </li>')
      }
      myScroll.refresh();
    }, 1000);
  }
})();