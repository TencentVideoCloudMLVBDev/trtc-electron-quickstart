# trtc-electron-quickstart 
如何快速创建一个Electron+WebRTC桌面应用

### 1. 准备

- [x] 一个常用的的编辑器（或者 IDE）
- [x] 系统安装了[Node.js 和 npm][5]
- [x] 了解HTML/CSS/JavaScript
- [x] 两台有摄像头的电脑

### 2. 运行示例代码
安装依赖，在文件目录下执行：
```
npm install
```
这一步会安装electron,后续打包需要的electron-builder；以及实时音视频SDK：trtc-sdk
启动项目：
```
npm run start
```
执行后，项目启动：
![此处输入图片的描述][9]
点击“我要视频通话”
![此处输入图片的描述][10]
要想体验多人通话，我们还需要另一台电脑也运行Demo。把your-app文件夹拷贝到另一台电脑，安装好依赖，运行Demo:
```
npm install
npm run start
```
可以互相通话了！两台设备物理距离过近的话，会有啸叫，物理距离远一些就好了。
![此处输入图片的描述][11]

### 3. 打包应用
在package.json中已经做了mac和Windows的electron-builder打包配置：
```
    "build": {
        "appId": "com.webrtc.app",
        "mac": {
            "target": [
                "dmg",
                "zip"
            ]
        },
        "win": {
            "target": [
                "nsis",
                "zip"
            ]
        }
    },
    "scripts": {
        "dist": "electron-builder"
    },
```
执行
```
npm run dist
```
在不同平台下生成对应平台的相关文件，这个过程可能比较长需要等待一两分钟，在Windows 64位平台执行完成后生成的文件如下：
![此处输入图片的描述][13]
自上往下分别是：
>未压缩的文件夹，其中包含可执行文件；
更新相关的文件；
安装程序；
安装程序的blockmap;
第一个文件夹的压缩文件夹

解压zip包或执行setup安装文件，应用启动后且没有报错，则说明本次打包成功。


  [5]: http://nodejs.cn/
  [9]: https://main.qcloudimg.com/raw/edcba0b128225f46ca36bc4c65872c72.png
  [10]: https://main.qcloudimg.com/raw/dbebeac91bbc9909c60e18648bcb3273.png
  [11]: https://main.qcloudimg.com/raw/6aacea8a28df89586d421c43f34721d6.png
  [13]: https://main.qcloudimg.com/raw/dd9b70fa30f3b1fa3ecd324740676c31.png