---
title: 树莓派刷入Raspbian
---

# 操作系统介绍

和我们平时使用的基于x86的PC不同，树莓派基于arm架构，一般都是使用linux来驱动树莓派（也有国外发烧友把win10整到了树莓派上，非IoT版本），这里只介绍linux的，其他的不提。

常见的linux有Debian、Ubuntu、CentOS，对应的树莓派版本则是基于Debian的Raspbian（官方系统，最近改名为Raspberry Pi OS）、Ubuntu（多种类型 desktop、server、core）、CentOS-AltArch。

以上几个都不重要，仅作补充，有兴趣自己深入了解，本页以官方镜像Raspbian为例示范刷入系统相关操作。

> 补充：[树莓派操作系统大全](https://wiki.nxez.com/rpi:list-of-oses)

# 烧录系统

首先是基础通用操作：

1. 下载安装树莓派官方[镜像烧录工具](https://www.raspberrypi.org/software/)，插入SD卡

2. 打开工具，根据树莓派型号选择对应的操作系统，选中插入的SD卡，点击WRITE
3. 等待烧写完成拔出SD卡插入树莓派上电启动

写入成功的提示

![written-finsh](/pi/1/written-finsh.png)

这里我有些差异化的地方，*仅供参考*，不同条件的可以网上另寻示范。

首先是树莓派的用途，由于仅打算作为一台小型linux服务器，部署些微服务和IoT，所以我只连接了网线和电源线，不使用HDMI，直接电脑使用SSH远程命令行操作。

Raspbian已经默认关闭了SSH服务，因此烧写完系统后，先不插入树莓派上电，而是拔出SD卡重新插入电脑。

此时会多出一个system-boot磁盘，进入磁盘新建一个ssh文件（无后缀无内容），然后再插到树莓派上电启动。

系统读取到这个文件时会在初始化时开启SSH服务，这样子才能使用电脑SSH连接上命令行。

![create-ssh](/pi/1/create-ssh.png)

# 连接SSH并修改密码

首先在路由器找到树莓派分配的ip地址

![find-ip](/pi/1/find-ip.png)

打开SSH工具连接，Raspbian的默认账号密码如下

> user: pi
>
> password: raspberry

这里使用Xshell连接SSH，登录成功截图如下：

![ssh-login](/pi/1/ssh-login.png)

图中提示你要修改密码了，输入`passwd`设置新密码，注意输入密码时是默认隐藏字符的

![](/pi/1/change-pwd.png)

如图所示即修改成功

# 彻底开启SSH服务

由于我们之前是通过创建SSH文件来启动SSH，正常情况应该是手动开启

输入`sudo raspi-config`进入树莓派设置，选择`Interface Options` - `SSH`，选择YES开启SSH服务

![](/pi/1/open-ssh-2.png)

![](/pi/1/open-ssh-3.png)

![](/pi/1/open-ssh-4.png)

# 修改更新软件源

Raspbian的源默认是境外的，连接速度可能不佳，建议替换为国内源

首先替换软件源，输入：

```
sudo nano /etc/apt/sources.list
```

将原有的代码用#号注释，粘贴以下代码：

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib
```

![](/pi/1/source-1.png)

`Ctrl+O` 保存，`Ctrl+x` 退出

按同样的操作，修改系统源

```
sudo nano /etc/apt/sources.list.d/raspi.list
```

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ buster main ui
```

![](/pi/1/source-2.png)

修改完成后，执行`sudo apt-get update`更新软件源列表，再执行`sudo apt-get upgrade`更新软件，一般只更新这两个。

```
#更新软件源列表
sudo apt-get update
#更新软件版本
sudo apt-get upgrade
sudo apt-get dist-upgrade
#更新系统内核
sudo rpi-update
```