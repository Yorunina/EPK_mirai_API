echo OFF
set a=0
:Menu
title EPK�������ӷ���[��������: %a%]
echo        ����ʱ��Ϊ%time%   ������%date%
echo ============================================================
echo      	������������... [��������: %a%]
echo ============================================================
node EPK_mirai_API.js
echo OFF
echo �����쳣�رգ�����20�������
ping -n 20 127.0.0.1>nul
set /a a=%a%+1
if %a% == 30 (
    echo ��������30�Σ��������ԣ���ǰʱ��Ϊ��%date% %time%
    pause
) else (
    goto Menu
)