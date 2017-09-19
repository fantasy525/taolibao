(function() {
  function MySocket(url) {
    this.ws = new WebSocket("ws://" + url);
  }
  MySocket.constructor = MySocket;
  MySocket.prototype = {
    init: function() {},
    open: function(fn) {
      this.ws.onopen = function() {
        fn();
      }
    },
    get: function(fn) {
      this.ws.onmessage = function(res) {
        console.log(res);
        try {
          var data = JSON.parse(res.data);
          if (data.length > 0) {
            fn(data);
          }
        } catch (e) {}
      }

    }
  }
  window.MySocket = MySocket;
})();