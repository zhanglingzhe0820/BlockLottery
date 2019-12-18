# 抽奖程序
年会抽奖程序，3D球体抽奖，支持奖品信息配置，参与抽奖人员信息`Excel`导入，抽奖结果`Excel`导出

## 技术
技术：Node + Express + Three.js

后台通过`Express`实现

前端抽奖界面通过`Three.js`实现3D抽奖球，引用了`Three.js`的官方3D示例

## 功能描述：
1. 可将抽奖结果进行保存实时下载到excel中
2. 已抽取人员不在参与抽取，抽中的人员不在现场可以重新抽取
3. 刷新或者关掉服务器，会保存当前已抽取的数据，不会进行数据重置，只有点击界面上的重置按钮，才能重置抽奖数据
4. 每次抽取的奖品数目可配置
5. 抽取完所有奖品后还可以继续抽取特别奖(例如：现在抽取红包，追加的奖品等)，此时默认一次抽取一个

## 预览
![欢迎](/product/src/img/f.jpg)

![欢迎](/product/src/img/s.jpg)

![欢迎](/product/src/img/t.jpg)

## 安装
```
git clone https://github.com/moshang-xc/lottery.git

cd lottery

// 安装插件
cd server
npm install

// 安装插件
cd ../product 
npm install

// 打包
npm start
cd dist

// 运行
node ../../server/index.js 48888

```
## 目录结构
```
Lottery
├── product
│   ├── src
│   │   ├── lottery
│   │   │   └── index.js
│   │   ├── lib
│   │   ├── img
│   │   ├── css
│   │   └── data
│   ├── package.json
│   └── webpack.config.js
├── server
│   ├── config.js
│   ├── server.js
│   └── package.js
```
> 1. product为前端页面目录 
> 2. package.josn web项目配置文件
> 3. webpack.config.js 打包配置文件
> 4. server为服务器目录
> 5. config为奖品信息的配置文件

## 配置信息
1. 抽奖用户信息，按指定的格式填写在`product/src/data/user.xlsx`文件中，不能修改文件名

2. 奖品的配置信息填写在`server/config.js`文件中，不能修改文件名
```js
// 奖品信息，第一项为预留项不可修改，其他项可根据需要修改
let prizes = [{
        type: 0,
        count: 1000,
        title: '特别奖',
        img: ''
    }, {
        type: 1,
        count: 1,
        title: '华为Mate 20X',
        img: '../img/huawei.png'
    }
    ...
];

/**
 * 一次抽取的奖品个数
 * 顺序为：[特别奖，一等奖，二等奖，三等奖，四等奖，五等奖]
 */
const EACH_COUNT = [1, 1, 1, 1, 1, 5];
// 公司名称，用于显示在抽奖名单的title部分
const COMPANY = 'MoShang';
```
