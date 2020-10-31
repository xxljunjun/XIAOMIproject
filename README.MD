## 一、创建一个项目文件夹
+ XIAOMIproject

## 二、npm init -y初始化项目
+ 出现一个package.json文件：用来存放下载的包名

## 三、创建一个src文件
文件名|功能|说明
:-|:-|:-|:-|:-|:-
pages|放置html页面|手动创建
images|放置图片|手动创建
lib|放置外部引用文件|手动创建
css|放置css文件|手动创建
php|放置php文件|手动创建
js|放置js文件|手动创建
json|放置json文件|手动创建
sass|放置sass文件|手动创建
font|放置图片文字|iconfont-阿里巴巴矢量图标库下载

## 四、其他文件说明
文件名|功能|说明
:-|:-|:-|:-|:-|:-
.gitignore.txt|上传至guitup忽略的文件|手动创建
dist|放置压缩后的src文件|gulp运行
node_modules|记录下载包|下载包后自动创建
package.json|记录下载包|npm init -y运行
package-lock.json|无|npm init -y运行

## 五、上传文件到gitHub
+ git init：用git去管理项目文件夹，会出现一个.git的隐藏文件夹
+ 书写.gitignore.txt文件：忽略不需要上传的东西
+ 在git bash here输入命令（比较友好有颜色的代码）
    + git add .：由工作区上传至暂存区
    + git commit -m "当前版本信息"：由暂存区上传至本地仓库
    + git remote add 别名 地址：修改gitup网址
    + git push 别名 本地分支：由本地仓库上传至远程仓库

# 六、在家里和公司相互转换操作
+ 如果没有文件就用git clone 远程地址，
	+ 没有就用git pull 远程地址(不友好，会主动合并分支)
	+ 没有就用git fetch 远程地址（友好）
+ 在终端输入：
    + npm i:根据package.json文件下载里面所有的包
    + gulp:打包压缩项目