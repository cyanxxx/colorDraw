const options = {
  path:' ws://localhost:9090'
}

export default class WebSocketSerive{
  constructor() {
    this.ws = new window.WebSocket(options.path);
    this.ws.onmessage = this.getWsMes.bind(this);
    this.events = {};
  }

  sendMsg(data, type) {
    console.log(data, type)
    var parseData = JSON.stringify({data, type});

    this.waitForConnection(()=>{
        this.ws.send(parseData);
    }, 1000);
  }
  waitForConnection(callback, interval) {
    if (this.ws.readyState === 1) {
        callback();
    } else {
        setTimeout(()=>{
            this.waitForConnection(callback, interval);
        }, interval);
      }
  }
  request(data, type){
    return new Promise((resolve, reject) => {
      try {
        //  传事件名和函数
        this.on(type, (data, error) => {
          if (error === true) {
            reject(data)
          }
          console.log(data)
          resolve(data)
        })
        this.sendMsg(data, type)
      } catch (e) {
        reject(e)
      }
    })
  }

  on(type,fn) {
    console.log(type, fn)
    this.events[type] = fn;
  }

  off(type) {
    if(this.events[type]){
      this.events[type] = null;
    }
  }

  //监听ws发来的数据

  getWsMes(data){
    var json = JSON.parse(data.data);
    console.log(json);
    this.events[json.type](json.data);   //调用相关函数，并放入数据
  }
}
