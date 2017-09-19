(function () {
    function MySocket (url) {
        this.ws = new WebSocket("ws://" + url);
    }
    MySocket.constructor = MySocket;
    MySocket.prototype = {
        init: function () {
            this.ws.onopen = this.open;
            this.ws.onmessage = this.get;
        },
        open: function () {
            console.log('连接成功')
        },
        get: function (event) {
            try{
                console.log(this.readyState,event.data);
            }catch(e){
            }
        }
    }
    window.MySocket = MySocket;
})();
