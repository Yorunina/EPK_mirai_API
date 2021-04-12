echo OFF
set a=0
:Menu
title EPK附属链接服务[重启次数: %a%]
echo        现在时间为%time%   今天是%date%
echo ============================================================
echo      	服务正在启动... [重启次数: %a%]
echo ============================================================
node EPK_mirai_API.js
echo OFF
echo 链接异常关闭，将于20秒后重启
ping -n 20 127.0.0.1>nul
set /a a=%a%+1
if %a% == 30 (
    echo 重试链接30次，放弃重试，当前时间为：%date% %time%
    pause
) else (
    goto Menu
)