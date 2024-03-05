---
title: 基于Arduino的智能物流小车
date: 2021-12-29 13:37:26
categories:
- SJTU
tags: 
- Arduino
- 物流小车                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
typora-root-url: 基于Arduino的智能物流小车
---



*工程实践项目：基于Arduino板的智能物流小车*

我的第一篇博客，就拿工程实践水一下了。

<!--more-->

## 场地示意图

![](img1.jpg)

## 要求

​		从出发区到达原料区，依次搬运三个物块到加工区，最后回到返回区。

​		虽然听着挺简单，但实际操作过程中遇到了太多的问题，比如由于安装不精确导致四个轮子不是那么完美，在写程序时直接让四个轮子速度相等并不能使小车走直线，而且四个轮子启动顺序也会对小车的方向产生微妙的影响。然后就是如何让小车平移，也需要精确调节四个轮子的速度。

​		接下来吐槽几句。令人蛋疼的是，学校提供的锂电池并不是恒压电池，而且程序是通过控制电压的高低来控制电机速度的，这就导致，==写的程序各个参数只能对标很小一段范围的电压==，在调试过程中会经常出现电池电压越用越低，参数不停的调的情况，充电后发现原来的程序又用不了了。唉~（这是一段很长的叹气）此外，锂电池电压充满电时大概是12.3V，这个电压对我们所用的Arduino UNO板子来说有点过高，很容易导致板子烧坏。（这也是我们用了五六块板子的部分原因，哈哈哈）也就是说，充满电的电池还不能用，得悠着点充电（笑哭）。

## Arduino程序

==注：这段程序只是我个人记录用，留个纪念罢了，不要拿来直接用，会gg的（虽然不太可能有人看到）。==



```c++
#include <Wire.h>

#include "MotorController4WD.h"
//#include "QGPMaker_IICSensorbar.h"
#include "QGPMaker_MotorShield.h"
MotorController4WD motorController(1, 1);

//const byte IIC_ADDRESS = 0x3F; 
//SensorBar io;
//电机
QGPMaker_MotorShield AFMS = QGPMaker_MotorShield(); 
QGPMaker_DCMotor *myMotor1 = AFMS.getMotor(1);
QGPMaker_DCMotor *myMotor2 = AFMS.getMotor(2);
QGPMaker_DCMotor *myMotor3 = AFMS.getMotor(3);
QGPMaker_DCMotor *myMotor4 = AFMS.getMotor(4);
//舵机
QGPMaker_Servo *myServo0 = AFMS.getServo(0);
QGPMaker_Servo *myServo2 = AFMS.getServo(2);
QGPMaker_Servo *myServo4 = AFMS.getServo(4);
QGPMaker_Servo *myServo6 = AFMS.getServo(6);



//int sensor[5] = {0, 0, 0, 0, 0};   //没用到巡线传感器
static int initial_motor_speed = 100;


void zhua();
void fang(); 

  void setup()
{
  Serial.begin(9600); //串口波特率115200（PC端使用）
  
  AFMS.begin(); 
  motorController.begin();
  
delay(3000);



for(int i=100;i>60;i--)
  {
    motorController.writeServo(6, i);

    delay(40);
    }


  myMotor1->run(BACKWARD);
  myMotor2->run(FORWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(BACKWARD);
  myMotor1->setSpeed(initial_motor_speed+10);
  myMotor3->setSpeed(initial_motor_speed-20);
  myMotor2->setSpeed(initial_motor_speed-10);
  myMotor4->setSpeed(initial_motor_speed+10);
  delay(5300);
  myMotor1->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(500);
  myMotor3->run(BACKWARD);
  myMotor4->run(BACKWARD);
  myMotor1->run(FORWARD);
  myMotor2->run(FORWARD);
  myMotor1->setSpeed(50);
  myMotor2->setSpeed(50);
  myMotor3->setSpeed(50);
  myMotor4->setSpeed(50);
  delay(1000);
  myMotor1->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor4->setSpeed(0);
    //机械臂伸直
  delay(1000);
    motorController.writeServo(0, 20);
    delay(500);
    motorController.writeServo(2, 25);
    delay(500);
    motorController.writeServo(4, 88);
    delay(500);
//夹子张开
   for(int i=110;i>60;i--)
  {
    motorController.writeServo(6, i);

    delay(40);
    }
  
  delay(1000);
  //第一个来回
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed);
  myMotor3->setSpeed(initial_motor_speed-11);  
  myMotor2->setSpeed(initial_motor_speed);
  myMotor4->setSpeed(initial_motor_speed-11);
  delay(1160);
  //抓
  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  zhua();
  delay(1000);
  
  myMotor1->setSpeed(initial_motor_speed-2);
  myMotor3->setSpeed(initial_motor_speed-7);  
  myMotor2->setSpeed(initial_motor_speed-2);
  myMotor4->setSpeed(initial_motor_speed-7);
  
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  delay(2370);

  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  fang();
  delay(1000);
  myMotor1->run(FORWARD);
  myMotor2->run(FORWARD);
  myMotor3->run(BACKWARD);
  myMotor4->run(BACKWARD);
  myMotor3->setSpeed(initial_motor_speed-7);
  myMotor1->setSpeed(initial_motor_speed-6);
  myMotor4->setSpeed(initial_motor_speed-7);
  myMotor2->setSpeed(initial_motor_speed-6);
  delay(4000);

  
  myMotor1->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(500);
  myMotor1->run(FORWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(BACKWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed);
  myMotor3->setSpeed(initial_motor_speed-10);
  myMotor2->setSpeed(initial_motor_speed-10);
  myMotor4->setSpeed(initial_motor_speed+20);
  delay(400);
  myMotor3->run(BACKWARD);
  myMotor4->run(BACKWARD);
  myMotor1->run(FORWARD);
  myMotor2->run(FORWARD);
  myMotor1->setSpeed(50);
  myMotor2->setSpeed(50);
  myMotor3->setSpeed(50);
  myMotor4->setSpeed(50);
  delay(1000);
//第二个来回  
  myMotor1->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed);
  myMotor3->setSpeed(initial_motor_speed-9);  
  myMotor2->setSpeed(initial_motor_speed);
  myMotor4->setSpeed(initial_motor_speed-9);
  delay(810);
  
  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  zhua();
  delay(1000);
  
  myMotor1->setSpeed(initial_motor_speed-2);
  myMotor3->setSpeed(initial_motor_speed-8);  
  myMotor2->setSpeed(initial_motor_speed-2);
  myMotor4->setSpeed(initial_motor_speed-8);
  
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  delay(2370);

  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  fang();
  delay(1000);
  myMotor1->run(FORWARD);
  myMotor2->run(FORWARD);
  myMotor3->run(BACKWARD);
  myMotor4->run(BACKWARD);
  myMotor4->setSpeed(initial_motor_speed-3);
  myMotor2->setSpeed(initial_motor_speed-7);
  myMotor3->setSpeed(initial_motor_speed-3);
  myMotor1->setSpeed(initial_motor_speed-7);
  delay(4000);

  myMotor1->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(500);
  myMotor1->run(FORWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(BACKWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed);
  myMotor3->setSpeed(initial_motor_speed-10);
  myMotor2->setSpeed(initial_motor_speed-10);
  myMotor4->setSpeed(initial_motor_speed+20);
  delay(400);
  myMotor3->run(BACKWARD);
  myMotor4->run(BACKWARD);
  myMotor1->run(FORWARD);
  myMotor2->run(FORWARD);
  myMotor1->setSpeed(50);
  myMotor2->setSpeed(50);
  myMotor3->setSpeed(50);
  myMotor4->setSpeed(50);
  delay(1000);
//第三个来回
  myMotor1->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed);
  myMotor3->setSpeed(initial_motor_speed-11);  
  myMotor2->setSpeed(initial_motor_speed);
  myMotor4->setSpeed(initial_motor_speed-11);
  delay(500);
  
  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  zhua();
  delay(1000);
  
  myMotor1->setSpeed(initial_motor_speed-2);
  myMotor3->setSpeed(initial_motor_speed-7);  
  myMotor2->setSpeed(initial_motor_speed-2);
  myMotor4->setSpeed(initial_motor_speed-7);
  
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  delay(2370);

  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);
  fang();
  delay(1000);
//回到返回区
  myMotor1->run(FORWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(BACKWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed+10);
  myMotor3->setSpeed(initial_motor_speed-20);
  myMotor2->setSpeed(initial_motor_speed-10);
  myMotor4->setSpeed(initial_motor_speed+10);
  delay(6000);
       
  myMotor1->run(BACKWARD);
  myMotor2->run(BACKWARD);
  myMotor3->run(FORWARD);
  myMotor4->run(FORWARD);
  myMotor1->setSpeed(initial_motor_speed-3);
  myMotor3->setSpeed(initial_motor_speed-7);
  myMotor2->setSpeed(initial_motor_speed-3);
  myMotor4->setSpeed(initial_motor_speed-7);
  delay(2000);
//停下
  myMotor1->setSpeed(0);
  myMotor3->setSpeed(0);
  myMotor2->setSpeed(0);
  myMotor4->setSpeed(0);
  delay(1000);    
}
  
void loop()
{
delay(1000);
  }


  void zhua()
{
  for(int i=20;i<40;i+=2)
  {
    motorController.writeServo(0, i);
    delay(10);
    }
delay(200);

for(int i=40,j=25;i<145;i+=4,j+=5)
  {
    motorController.writeServo(0, i);
    motorController.writeServo(2, j);

    delay(20);
    }
delay(500);
    
//爪子夹紧
      for(int i=60;i<110;i++)
  {
    motorController.writeServo(6, i);

    delay(30);
    }
delay(500);
    //收回
    for(int i=145,j=155;i>40;i-=4,j-=5)
  {
    motorController.writeServo(0, i);
    motorController.writeServo(2, j);

    delay(20);
    }
 for(int i=40;i>20;i-=2)
  {
    motorController.writeServo(0, i);

    delay(10);
    }
}

void fang()
{
  for(int i=25;i<150;i++){
motorController.writeServo(2, i);
delay(15);
}
delay(500);
for(int i=88;i>65;i--)
{
  motorController.writeServo(4, i);
  delay(15);
  }
delay(300);
for(int i=20;i<145;i++){
motorController.writeServo(0, 145);
delay(15);
}
delay(1000);
  
//松开爪子+
delay(500);
   for(int i=110;i>60;i--)
  {
    motorController.writeServo(6, i);
    delay(30);
    }
  delay(500);
    //收回
    for(int i=145,j=145;i>40;i-=4,j-=5)
  {
    motorController.writeServo(0, i);
    motorController.writeServo(2, j);

    delay(10);
    }
 for(int i=40;i>20;i-=2)
  {
    motorController.writeServo(0, i);

    delay(10);
    }
  }
```

## 后话

这次工程实践比赛时也出现了板子烧坏的情况，端口消失，没能上传改过参数的代码，结果就直接寄了。虽然感觉有种这几天夜都白熬的感觉，不过，也学到了不少。（比如，~~arduino板是非常脆弱的？~~应该是我们操作不太行，以后就知道怎么呵护这块板子了hhh）

