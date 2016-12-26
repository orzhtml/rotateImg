### jq-利用canvas让图片旋转角度

#### 说明

如果你没有 gulp 请先全局安装
在（控制台 | cmd）中输入命令全局安装 gulp

// window

`npm install -g gulp`

// MacOS | Linux

`sudo npm install -g gulp`

安装完成后再输入检查是否安装成功

`gulp -v`

然后通过 cmd 进入本插件的目录

`cd /你的目录/rotateImg`

安装依赖（最好开 vpn）

`npm install`

依赖安装完成后运行

`gulp`

四个角度变化：

0:

canvas.width = width;

canvas.height = height;

cxt.translate(0, 0);

cxt.rotate(0 * Math.PI / 180);

----

90:

canvas.width = height;

canvas.height = width;

cxt.translate(height, 0);

cxt.rotate(90 * Math.PI / 180);

----

180:

canvas.width = width;

canvas.height = height;

cxt.translate(width, height);

cxt.rotate(180 * Math.PI / 180);

----

270:

canvas.width = height;

canvas.height = width;

cxt.translate(0, width);

cxt.rotate(270 * Math.PI / 180);