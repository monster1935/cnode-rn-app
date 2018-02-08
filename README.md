## cnode-rn-app

> 该项目旨在学习react-native的开发方式，以 CNode 社区的 API 为基础，使用 React-Native 完成了 App 的大部分功能。特此感谢 [CNode 社区](https://cnodejs.org/)。

### TodoList

#### 第一阶段

初步完成 app 的原型阶段，包括 app 的核心交互功能，文章展示等。该阶段的主要在于体会react-native的开发方式。目前已经完成以下功能：

- [x] 阅读react-native 文档， 搭建 Android react-native 开发环境
- [x] 阅读react-navigation 文档，添加 App 导航
- [x] 首页不同类型文章的显示
- [x] 文章详情页的展示，评论的显示
- [x] 基于token的扫码登录功能
- [x] 文章的收藏功能
- [x] 收藏、消息模块的登录鉴权以及相关现实
- [x] 登录、设置、关于等相关模块的显示
- [x] 评论的点赞功能
- [ ] 添加发帖功能
- [x] 文章的优化显示，主要在于内嵌于 Text 中的 Image 在 Android 上的显示
- [ ] 导航的优化

#### 第二阶段

项目的优化阶段，在现有原型交互功能的基础上，深入理解 react 的组件化开发方式以及 react-native 在Android, IOS上的一些不同的处理。主要包括以下几点：

- [ ] react 生命周期钩子函数 总结
- [ ] react setState 的深入理解
- [ ] react 数据 diff 算法
- [ ] react-native 在 Android 以及 IOS 上的不同处理

#### 第三阶段

深入理解 react-native 的阶段，包括在 android 以及 ios 下的编译过程，如何在 android 以及ios项目中介入部分 react-native 的开发。


### 运行

以 Android 上的运行为例，该项目暂未在 IOS 下 调试。

前提： 正确搭建了 Android 的 开发环境，具体见: [搭建开发环境](https://reactnative.cn/docs/0.51/getting-started.html#content)

```bash
# git clone
git clone https://github.com/monster1935/cnode-rn-app.git

# use yarn or npm install the package
yarn

# start the package server
react-native run-android

```
### App 截图

![](https://raw.githubusercontent.com/monster1935/cnode-rn-app/master/img/cnode-1.jpg)

![](https://raw.githubusercontent.com/monster1935/cnode-rn-app/master/img/cnode-2.jpg)

![](https://raw.githubusercontent.com/monster1935/cnode-rn-app/master/img/cnode-3.jpg)

### 最后

该项目为个人学习 react-native 的 Demo, 欢迎技术交流。
