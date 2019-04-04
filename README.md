# color-draw

> 你画我猜的手机版vue构建

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
# 目录结构
- `build` vue-cli的默认配置
- `config` 
    -  `index` 在本地测试时，可以将host改成0.0.0.0可以让手机访问到只要在同一个路由器下，在ipconfig查看本机ip地址在手机输入该地址即可浏览
- `src`
    - `assert` 静态图片和全局样式表，字体放在这里
    - `components` 公用组件
    - `router` 路由
    - `store` vuex，这里主要用来存用户信息，同时也保存在localstorge中，方便断线玩家直连
    - `views` 
        - `Main` 主界面大厅
        - `Room` 房间
    - `bar.js`  直接添加在body下的loading组件
    - `tip.js`  直接添加在body下的提示信息组件
    - `permission.js` 全局路由守卫，拦截中途进入的用户，可能是断线或不是从主页进去的
    - `webSocketServie.js` 配置后台路径，接受websocket的onmessage事件，调用在组件注册的事件