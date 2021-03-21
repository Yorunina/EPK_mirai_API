var WebSocket = require('ws');
var zlib = require('zlib');
var fs = require('fs');
var http=require('http');
var request=require('request');
var urlencode = require('urlencode');
const { time, timeStamp } = require('console');
//执行包导入
var ws = new WebSocket('ws://0.0.0.0:6700');
var uploadurl = "http://localhost:8000";
//创建一个websocket链接

//戳一戳事件
function poke_event(data){
    group_id = data.group_id ? data.group_id : "0";
    queststr = data.user_id + "|" + data.target_id + "|" + group_id;
    request(uploadurl + "/?msg=" + urlencode("[HTTP戳一戳]" + queststr), function (error, response, body){
    });
    console.log("已发送戳一戳消息(" + queststr + ")");
    return;
};

//运气王事件
function lucky_king_event(data){
    queststr = data.user_id + "|" + data.target_id + "|" + data.group_id;
    request(uploadurl + "/?msg=" + urlencode("[HTTP运气王]"+queststr),function (error, response, body){
    });
    console.log("已发送运气王消息(" + queststr + ")");
    return;
};

//群荣耀变更事件
function honor_event(data){
    queststr = data.user_id + "|" + data.honor_type + "|" + data.group_id
    request(uploadurl + "/?msg=" + urlencode("[HTTP群荣耀变更]"+queststr),function (error, response, body){
    });
    console.log("已发送群荣耀变更消息(" + queststr + ")");
    return;
};

//群撤回事件
function group_recall_event(data){
    queststr = data.user_id + "|" + data.operator_id + "|" + data.message_id + "|" + data.group_id;
    request(uploadurl + "/?msg=" + urlencode("[HTTP群消息撤回]"+queststr),function (error, response, body){
    });
    console.log("已发送群撤回消息(" + queststr + ")");
    return;
};

//好友撤回事件
function friend_recall_event(data){
    queststr = data.user_id + "|" + data.user_id + "|" + data.message_id + "|0";
    request(uploadurl + "/?msg=" + urlencode("[HTTP好友消息撤回]"+queststr),function (error, response, body){
    });
    console.log("已发送好友撤回消息(" + queststr + ")");
    return;
};

//精华消息事件
function essence_event(data){
    //测试类别
    queststr = data.sender_id + "|" + data.operator_id + "|" + data.message_id + "|" +data.sub_type;
    request(uploadurl + "/?msg=" + urlencode("[HTTP精华消息]"+queststr),function (error, response, body){
    });
    console.log("已发送精华消息(" + queststr + ")");
    return;
};

function client_status_event(data){
    //客户端状态变更

};

function exit_event(){
    queststr = new Date().getTime();
    request(uploadurl + "/?msg=" + urlencode("[HTTPws断开]") + queststr,function (error, response, body){
    });
    console.log("已发送ws断开信息(" + queststr + ")")
    return;
};

//定义链接建立时的动作
ws.onopen = function (e) {
    console.log("与go-cqhttp正向ws接触成功！");
};

//主消息事件处理序列
ws.onmessage = function (e) {
    var Jdata = e.data;
    if(Jdata){
        data = JSON.parse(Jdata.trim());
        switch (data.post_type){
            case "notice":
                //常规事件类别
                switch (data.notice_type){
                    //特殊提醒事件
                    case "notify":
                        switch (data.sub_type){
                            case "poke":
                                //戳一戳事件
                                poke_event(data);
                                break;
                            case "lucky_king":
                                //运气王事件
                                lucky_king_event(data);
                                break;
                            case "honor":
                                //群荣耀事件
                                honor_event(data);
                                break;
                            default:
                        }
                        break;
                    case "group_recall":
                        //群撤回事件
                        group_recall_event(data);
                        break;
                    case "friend_recall":
                        //好友撤回事件
                        friend_recall_event(data);
                        break;
                    case "essence":
                        //精华消息事件
                        essence_event(data);
                        break;
                    case "client_status":
                        //客户端在线状态变更
                        client_status_event(data);
                        break;
                    default:
                }
            break;
			default:
        }
    }

};

ws.onerror = function (e) {
    console.log("error：" + e);
};

ws.onclose = function (e) {
    console.log("ws连接关闭/丢失，我直接爆炸开。");
    exit_event();
};