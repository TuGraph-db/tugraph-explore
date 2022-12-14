TuGraph Explore 强依赖 TuGraph，因此，在启动 Explore 之前，我们先需要先启动 TuGraph。

### TuGraph 简介

TuGraph 是蚂蚁集团自主研发的图数据库，提供图数据库引擎和图分析引擎。其主要特点是大数据量存储和计算，同时支持高效的在线事务处理（OLTP）和在线分析处理（OLAP）。

### 安装 TuGraph

> 更多内容请参考官网文档。

TuGraph 需要通过 Docker Image 安装，按照以下步骤在本地进行安装：

- 安装本地 Docker 环境：参考[官方文档](https://docs.docker.com/get-started/)；

```shell
$ sudo docker --version
```

上面的命令如果能顺利打印出 docker 版本号，则说明 docker 环境已安装。

- 下载 TuGraph 镜像：[点击下载](https://tugraph.oss-cn-beijing.aliyuncs.com/tugraph/3.1.1/tugraph.zip?Expires=1660305441&OSSAccessKeyId=STS.NSp3QMeFCAxqkNRtE9Zvm3Zqw&Signature=uRSP66wbO36SLAaTBqKRvZPDYn8%3D&security-token=CAIS8wF1q6Ft5B2yfSjIr5DFeOv5iJli9rqaaWjjkEVsVvlB3J%2FalTz2IHBNeHJrCeAWs%2FQwlGxS6%2Fwalq8pG8EYHBec6xC%2BElUPo22beIPkl5Gfz95t0e%2BIewW6Dxr8w7WhAYHQR8%2FcffGAck3NkjQJr5LxaTSlWS7OU%2FTL8%2BkFCO4aRQ6ldzFLKc5LLw950q8gOGDWKOymP2yB4AOSLjIx5FUl0DokuPTkmpzFukCEtjCglL9J%2FbaWC4O%2FcsxhMK14V9qIx%2BFsfsLDqnUAskQRr%2Fcm3PEUpmeb5IzHW0M37A%2BPK%2BrJ6dB1aRV%2BYqUqnQ7xHnhvBpcagAE%2FY1mjL55zL4iaKrNbAQfUXNcaQpItZFXjtTQkSDnq95ICQokhm%2B4MCRacGGB%2FcYEwrmSmPPRcXqFsdvnZBVrTi7rbZG8sYzr%2BHj0XL5vzTMjiuZbMGTs0AWnHlphPHHheMr0xQgd7aWBTdFYzFcUs03Kd2tm%2BVn65KkcFF2AQiw%3D%3D&securityToken=CAIS8wF1q6Ft5B2yfSjIr5DFeOv5iJli9rqaaWjjkEVsVvlB3J/alTz2IHBNeHJrCeAWs/QwlGxS6/walq8pG8EYHBec6xC+ElUPo22beIPkl5Gfz95t0e+IewW6Dxr8w7WhAYHQR8/cffGAck3NkjQJr5LxaTSlWS7OU/TL8+kFCO4aRQ6ldzFLKc5LLw950q8gOGDWKOymP2yB4AOSLjIx5FUl0DokuPTkmpzFukCEtjCglL9J/baWC4O/csxhMK14V9qIx+FsfsLDqnUAskQRr/cm3PEUpmeb5IzHW0M37A+PK+rJ6dB1aRV+YqUqnQ7xHnhvBpcagAE/Y1mjL55zL4iaKrNbAQfUXNcaQpItZFXjtTQkSDnq95ICQokhm+4MCRacGGB/cYEwrmSmPPRcXqFsdvnZBVrTi7rbZG8sYzr+Hj0XL5vzTMjiuZbMGTs0AWnHlphPHHheMr0xQgd7aWBTdFYzFcUs03Kd2tm+Vn65KkcFF2AQiw==)

目前，TuGraph 提供基于 Ubuntu 16.04 LTS 和 CenterOS 7.3 系统的镜像文件，镜像文件是一个名为 lgraph_x.y.z.tar 的压缩文件，其中 x.y.z 是 TuGraph 的版本号。

- 加载 TuGraph 镜像：

```shell
// lgraph_lastest.tar.gz 是 TuGraph 镜像文件名
$ docker import lgraph_lastest.tar.gz

// 加载完毕后，提示已加载镜像
```

- 启动 Docker

```shell
$ docker run -d -v {host_data_dir}:/mnt -p 7090:7090 -it reg.docker.alibaba-inc.com/tugraph/tugraph:x.y.z
$ docker exec -it {container_id} bash

// host_data_dir = /Users/moyee/tugraph
// container_id = xxx
$ docker run -d -v /Users/moyee/tugraph:/mnt -p 7090:7090 -it reg.docker.alibaba-inc.com/tugraph/tugraph:3.1.1
$ docker exec -it xxx bash

```

参数说明：

- -v 是目录映射
- {host_data_dir} 是用户希望保存数据的目录，比如 /home/user1/workspace
- -p 的作用是端口映射，示例中将 Docker 的 7090 端口映射到本地的 7090 端口
- {container_id} 是 Docker 的 container id，可以通过 docker ps 获得

### TuGraph 操作

#### 启动 TuGraph 服务

```shell
$ lgraph_server --license /mnt/fma.lic --config ~/demo/movie/lgraph.json
```

- fma.lic 是授权文件，应放在 {host_data_dir} 文件夹中，映射到 docker 的 /mnt 目录下
- lgraph.json 是 TuGraph 的配置文件

#### 访问 TuGraph Query

TuGraph Browser 是 TuGraph 提供的可视化查询工具。用户可以打开浏览器，输入{IP}:{Port}，输入默认用户名为 admin，密码为 73@TuGraph 完成登录，登录成功后进入到 TuGraph Query 页面。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/244306/1661929936944-db67706f-587b-469c-bfd6-1725b86f9aff.png#clientId=u2a1fe9b6-a67a-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=392&id=ua0b4c58f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=784&originWidth=2694&originalType=binary&ratio=1&rotation=0&showTitle=false&size=308625&status=error&style=none&taskId=uf167221c-9e93-4d38-8fc6-7e4cf0e7c3b&title=&width=1347)

### TuGraph Explore 简介

TuGraph Explore 是基于 GraphInsight 构建的图可视分析平台，提供了完整的图探索分析能力，能够帮助用户从海量的图数据中洞察出有价值的信息，具体案例可参考「[基于 TuGraph Explore 挖掘网络黑灰产子图](https://www.yuque.com/antv/gi/tnsgrf)」。

### 启动 TuGraph Explore

TuGraph 安装成功以后，就可以开始安装 TuGraph Explore。

- 拉取 TuGraph Explore 镜像：

```shell
$ docker pull antvis/tugraph_explore:1.0.0

// 加载完毕后，提示已加载镜像

// 如果已经将镜像下载到本地了，使用 import
$ docker import antvis/tugraph_explore:1.0.0
```

- 启动 Docker

```shell
$ docker run -d -p 7091:7091 -it antvis/tugraph_explore:1.0.0
$ docker exec -it {container_id} bash
```

参数说明：

- -p 的作用是端口映射，示例中将 Docker 的 7091 端口映射到本地的 7091 端口
- {container_id} 是 Docker 的 container id，可以通过 docker ps 获得
- 启动 TuGraph Explore

```shell
$ cd /usr/src/tugraphexplore
$ npm run dev -- -p 7091
```

TuGraph Explore 服务启动起来以后，通过 `**http://localhost:**7091**/tugraph/explore.html**` 就可以访问了，如果一切正常，就会看到如下页面。![image.png](https://cdn.nlark.com/yuque/0/2022/png/244306/1661930952533-987d071b-34e6-437e-95c4-f89c0561a271.png#clientId=u2a1fe9b6-a67a-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=684&id=u66e5799b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1368&originWidth=2700&originalType=binary&ratio=1&rotation=0&showTitle=false&size=836980&status=error&style=none&taskId=u7587cce3-1787-4e30-9b05-2646c59d186&title=&width=1350)

### 连接 TuGraph

TuGraph Explore 启动起来以后，第一步就是需要连接 TuGraph 数据库。点击「连接」按钮，弹出连接图数据库的页面，如下图所示。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/244306/1662707213765-a939f7b4-04cc-4be5-b2f3-8e1ddc8381a2.png#clientId=uf205b453-7d8b-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=422&id=ud4279631&margin=%5Bobject%20Object%5D&name=image.png&originHeight=844&originWidth=2660&originalType=binary&ratio=1&rotation=0&showTitle=false&size=431343&status=error&style=none&taskId=u02ecf060-2255-433f-a3ae-f1c1f402a1b&title=&width=1330)
连接 TuGraph 数据，我们需要提供以下信息：

- 图数据库的账号
- 图数据库的密码
- 图数据库的地址：格式为 ip:port

特别提示 地址需要填写容器 IP，可以通过如下指令查看。

```shell
$ docker run -d -v /Users/xx/tugraph:/mnt -p 7090:7090 -it reg.docker.alibaba-inc.com/tugraph/tugraph:3.3.0
$ docker exec -it 8408b49033bc1698(TuGraph 的容器) bash
$ cat /etc/hosts
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.17.0.4	8408b543243bc69
```

如上图所示，连接图数据库的地址应该填写：`**172.17.0.4:7090**`。
