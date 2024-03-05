---
title: bat脚本使用小tips
typora-root-url: bat脚本使用小tips
date: 2023-08-03 23:13:23
updated:
categories:
- 随笔
tags:
- bat
- 脚本
---

 使用bat脚本时的一些小tips

<!--more-->

1.echo off的作用

参考这个，讲的很详细[bat文件的@echo off是什么作用？_](https://blog.csdn.net/qq_39071599/article/details/111477894)

简单来讲就是，echo是回显的作用，会显示这条命令后的内容，而echo off就是关闭回显，但是不包括这条命令，@echo off就是关闭回显且包括这条命令

2.在bat里调用其它bat

两种方式，一种是call，在本bat窗口调用，另一种是start，会另开一个窗口

这里以一个情景为例，在Desktop文件夹里我创建了test.bat文件，想要调用Desktop\test文件夹下三个bat文件，分别为1.bat,2.bat,3.bat，三个文件内容相同均为：

```bat
@echo off
echo 1
```

由于没有加入pause，脚本会在迅速执行后自动关闭窗口

那么我在test.bat文件中写入

```bat
@echo off
cd test
start 1.bat
start 2.bat
start 3.bat
```

期望的效果是，分别调用三个窗口，执行后自动关闭窗口，但是实际的效果是留下了三个窗口，如图

<img src="image-20230803233034468.png" alt="image-20230803233034468" style="zoom: 67%;" />

要想自动关闭这个窗口，在三个文件结尾加入exit即可。

```bat
@echo off
echo 1
exit
```

另外，如果是一直执行的脚本，不能exit，但我们又不想手动去最小化每个窗口，那么，只要在test.bat的start后加入参数"/min"即可

```bat
@echo off
cd test
start /min 1.bat
start 2.bat
start 3.bat
```

这样就会在启动新窗口时自动最小化了。其它可用的参数如下：

```
“title” 指定在“命令提示符”窗口标题栏中显示的标题。
/dpatch 指定启动目录。
/i 将 Cmd.exe 启动环境传送到新的“命令提示符”窗口。
/min 启动新的最小化窗口。
/max 启动新的最大化窗口。
/separate 在单独的内存空间启动 16 位程序。
/shared 在共享的内存空间启动 16 位程序。
/low 以空闲优先级启动应用程序。
/normal 以一般优先级启动应用程序。
/high 以高优先级启动应用程序。
/realtime 以实时优先级启动应用程序。
/abovenormal 以超出常规优先级的方式启动应用程序。
/belownormal 以低出常规优先级的方式启动应用程序。
/wait 启动应用程序，并等待其结束。
/b 启动应用程序时不必打开新的“命令提示符”窗口。除非应用程序启用 CTRL+C，否则将忽略 CTRL+C 操作。使用 CTRL+BREAK 中断应用程序。
```

