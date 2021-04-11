# EPK_mirai_API
 Based on GO-CQHTTP, provide simple api for EPK with nodejs.
 
 基于[GO-CQHTTP](https://github.com/Mrs4s/go-cqhttp)，通过node.js服务为EPK(铃心自定义)提供额外事件服务的简易项目。

# 使用方法

+ ### 配置GO-CQHTTP服务
  * 首先你需要下载[GO-CQHTTP](https://github.com/Mrs4s/go-cqhttp)并且完成Mirai方的机器人基础配置，其中你需要注意的是设置好websocket对应的本地端口。
  * 当你设置完成端口后（默认为6700），请根据您的端口选择，把对应的ws链接填写在本项目中。（即EPK_mirai_API.js中前几行定义的ws.）
+ ### 配置EPK WEB服务器服务
  * 右键打开铃心自定义的设置界面，然后进入即时调试，输入“开启服务器-xxxx”，其中xxxx代表铃心监听的端口号，如“开启服务器-8000”代表铃心自定义会监听[http://localhost:8000]
  * 在监听设置完成之后，根据您设置的具体端口，把对应的uploadurl链接填写在本项目中。（即EPK_mirai_API.js中前几行定义的uploadurl.）
+ ### 下载并打开本项目
  * 在完成上文的设置之后，你需要先打开GO-CQHTTP和XQ双框架，之后双击本项目中的start.bat完成对node.js的启动。
  * 在启动之后，本项目会链接GO-CQHTTP的ws，并且将接收到的事件转发至EPK的监听端口。
  * 在GO-CQHTTP服务断开的情况下，本项目会根据bat中设置的时间进行重连（20s）。
 # 注意事项
 请注意，在这里发出的所有事件，铃心接收到之后会视为是**来自于私聊**并且**无发送者QQ**的**无源消息**！请不要通过常规方式进行回复！回复请额外调用【输出流】或者dll乃至通过GO-CQHTTP直接发送消息。否则将无法正常回复！

**本系统转接消息发送的格式一般为：[HTTP消息类别]消息数据**
 
如对接收到的“私聊戳一戳消息”：

````[HTTP戳一戳]{"notice_type":"notify","post_type":"notice","self_id":1207644216,"sender_id":836193631,"sub_type":"poke","target_id":1207644216,"time":1618115758,"user_id":836193631}````

对于不同的消息内容，可以参考[GO-CQHTTP](https://github.com/Mrs4s/go-cqhttp)的文档，或者自行通过事件输出Json消息自行分析。