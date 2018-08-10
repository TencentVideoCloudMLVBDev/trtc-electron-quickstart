/*
    写在前面：
    为了保持在功能演示方面的简洁， demo不会做任何合法性校验

    欲了解更多，参考腾讯实时音视频官方文档：
    https://cloud.tencent.com/document/product/647
*/

// 引入trtc-sdk
var trtc = require("trtc-sdk");

// 本demo用到的唯一一个CGI，获取usersig和privateMapKey（什么是usersig，privateMapKey?我该怎么自己实现?参考：https://cloud.tencent.com/document/product/647/17275 )
var FetchSigCgi = 'https://sxb.qcloud.com/sxb_dev/?svc=account&cmd=authPrivMap';
var sdkappid = 1400037025,
    accountType = 14418, 
    userSig,
    userId = "video_"+ parseInt(Math.random()*100000000),
    roomId = 100936;

//step 1: 获取usersig和privateMapKey
// 注意：在实际应用中，接口需要业务方自己实现
function login(){
    $.ajax({
        type: "POST",
        url: FetchSigCgi,
        dataType: 'json',
        data:JSON.stringify({
            pwd: "12345678",
            appid: parseInt(sdkappid),
            roomnum:roomId,
            privMap:255,
            identifier : userId,
            accounttype: accountType
        }),
        success: function (json) {
            if(json && json.errorCode === 0 ){
                var userSig = json.data.userSig;
                var privateMapKey = json.data.privMapEncrypt;
                $("#video-section").show();
                $("#input-container").hide();
                initRTC({
                    "userId": userId,
                    "userSig": userSig,
                    "privateMapKey": privateMapKey,
                    "sdkappid": sdkappid,
                    "accountType": accountType,
                    "roomid": roomId
                });
            }else{
                console.error(json);
            }
        },
        error: function (err){
            console.error(err);
        }
    })
}

//step 2: 初始化一个WebRTCAPI实例
function initRTC(opts){
    window.RTC = new WebRTCAPI({
        "useCloud": 0 ,
        "userId": opts.userId,
        "userSig": opts.userSig,
        "sdkAppId": opts.sdkappid,
        "accountType": opts.accountType
    },function(){
        // step 3: 创建（若房间已经存在则进入）房间
        RTC.createRoom({
            roomid : opts.roomid * 1,
            privateMapKey: opts.privateMapKey,
            role : "user"
        });
    },function( error ){
        console.error("init error", error)
    });

    // 添加事件响应函数
    RTC.on("onRemoteStreamUpdate",onRemoteStreamUpdate)
    RTC.on("onLocalStreamAdd",onLocalStreamAdd)
    RTC.on("onRemoteStreamRemove",onRemoteStreamRemove)
}

function createVideoElement( id, isLocal ){
    var videoDiv=document.createElement("div");
    videoDiv.innerHTML = '<video id="'+id+'" autoplay '+ (isLocal ? 'muted':'') +' playsinline ></video>';
    document.querySelector("#remote-video-wrap").appendChild(videoDiv);

    return document.getElementById(id);
}

function onLocalStreamAdd(info) {
    if (info.stream && info.stream.active === true)
    {
        var id = "local";
        var video = document.getElementById(id);
        if(!video){
            createVideoElement(id, true);
        }
        var video = document.getElementById(id)
        video.srcObject = info.stream;
        video.muted = true
        video.autoplay = true
        video.playsinline = true
    }
}

function onRemoteStreamUpdate( info ) {
    if (info.stream && info.stream.active === true)
    {
        var id = info.videoId;
        var video = document.getElementById(id);
        if(!video){
            video = createVideoElement(id);
        }
        video.srcObject = info.stream;
    }
}

function onRemoteStreamRemove( info ) {
    console.log( info.userId+ ' 断开了连接');
    var videoNode = document.getElementById( info.videoId );
    if( videoNode ){
        videoNode.srcObject = null;
        document.getElementById(info.videoId).parentElement.removeChild(videoNode);
    }
}