var WebSocket = require('ws');
var request=require('request');
var urlencode = require('urlencode');
//执行包导入
var ws = new WebSocket('ws://0.0.0.0:6700');
var uploadurl = "http://localhost:8000";
//创建一个websocket链接

function common_recall(type,data){
    let group_id = data.group_id ? data.group_id : 0;
    let user_id = data.user_id ? data.user_id : 0;
    request(uploadurl + "/?msg=" + urlencode(type + JSON.stringify(data)) + "&fromQQ=" + user_id +"&fromGroup=" + group_id, function (error, response, body){
        if(error){
            console.log("遇到错误！ "+error);
    }
        else{
            console.log("已发送来源于[" + group_id + "," + user_id + "]的" + type + "消息");
        };
    });
    return;
}


function poke_event(data){
    common_recall("[HTTP戳一戳]",data);
    return;
};
function lucky_king_event(data){
    common_recall("[HTTP运气王]",data);
    return;
};
function honor_event(data){
    common_recall("[HTTP群荣耀变更]",data);
    return;
};
function group_upload_event(data){
    common_recall("[HTTP文件上传]",data);
    return;
};
function group_admin_event(data){
    common_recall("[HTTP管理变更]",data);
    return;
};
function group_decrease_event(data){
    common_recall("[HTTP群成员减少]",data);
    return;
};
function group_increase_event(data){
    common_recall("[HTTP群成员增加]",data);
    return;
};
function group_ban_event(data){
    common_recall("[HTTP群禁言]",data);
    return;
};
function friend_add_event(data){
    common_recall("[HTTP好友添加]",data);
    return;
};
function group_recall_event(data){
    common_recall("[HTTP群消息撤回]",data);
    return;
};
function friend_recall_event(data){
    common_recall("[HTTP好友消息撤回]",data);
    return;
};
function group_card_event(data){
    common_recall("[HTTP成员名片更新]",data);
    return;
};
function offline_file_event(data){
    common_recall("[HTTP接收离线文件]",data);
    return;
};
function friend_event(data){
    common_recall("[HTTP加好友请求]",data);
    return;
};
function group_event(data){
    common_recall("[HTTP加群请求]",data);
    return;
}
function client_status_event(data){
    common_recall("[HTTP客户端在线状态变更]",data);
    return;
};
function essence_event(data){
    common_recall("[HTTP精华消息]",data);
    return;
};
function exit_event(){
    request(uploadurl + "/?msg=" + urlencode("[HTTPws断开]"), function (error, response, body){
        if(error){
            console.log("遇到错误！ "+error);
    }
        else{
            console.log("已发送[HTTPws断开]消息");
        };
    });
    return;
};

//定义链接建立时的动作
ws.onopen = function (e) {
    request(uploadurl + "/?msg=" + urlencode("[HTTPws成功接触]"), function (error, response, body){
        if(error){
            console.log("遇到错误！ "+error);
    }
        else{
            console.log("已发送[HTTPws成功接触]消息");
        };
    });
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
                                //戳一戳事件，包含好友和群戳一戳
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
                    case "group_upload":
                        //群文件上传事件
                        group_upload_event(data);
                        break;
                    case "group_admin":
                        //群管理员变动
                        group_admin_event(data);
                        break;
                    case "group_decrease":
                        //群成员减少事件
                        group_decrease_event(data);
                        break;
                    case "group_increase":
                        //群成员增加事件
                        group_increase_event(data);
                        break;
                    case "group_ban":
                        //群禁言事件
                        group_ban_event(data);
                        break;
                    case "friend_add":
                        //好友添加事件，包含主动添加
                        friend_add_event(data);
                        break;
                    case "group_recall":
                        //群撤回事件
                        group_recall_event(data);
                        break;
                    case "friend_recall":
                        //好友撤回事件
                        friend_recall_event(data);
                        break;
                    case "group_card":
                        //群成员名片更新
                        group_card_event(data);
                        break;
                    case "offline_file":
                        //收到离线文件
                        offline_file_event(data);
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
			case "request":
                switch (data.request_type){
                    case "friend":
                        //加好友请求，此为被动接收到的请求，包含flag参数
                        friend_event(data);
                        break;
                    case "group":
                        //加群请求/邀请
                        group_event(data);
                        break;
                    default:
                }
            default:
        }
    }
};

ws.onerror = function (e) {
};

ws.onclose = function (e) {
    console.log("ws连接关闭/丢失，我直接爆炸开。");
    exit_event();
};