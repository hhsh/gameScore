# 简介
一个游戏得分排行榜项目，基于Nodejs、Redis 和Jade技术。
# 步骤

第一，分别安装nodejs（自动包含npm）和安装git。

第二，下载gameScore项目源码到本地，命令如下：
```shell
git clone https://github.com/hhsh/gameScore.git
```
第三，下载后，进入express文件夹，更新模块依赖，命令如下：
```shell
npm i -d
```
第四，进入gameScore文件夹，运行SocketServer.js，命令：
```shell
node SocketServer.js
```
第五，另起一个命令行窗口，然后运行SocketClient.js，命令：
```shell
node SocketClient.js
```
第六，在SocketClient发送数据给SocketServer.js。数据位于data.js文件里面，一行一行复制，然后回车即可发送。

第七，启动WebServer.js，命令：
```shell
node WebServer.js
```
第八，访问http://localhost:3000/ 查看效果。
