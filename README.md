# xlsx-importer

将 xlsx 转换成目标数据

# 起因

啊, 对面的快递回馈单每次给到的格式都不一样啊!!!!!!!

## 使用

```js
// 声明目标数据
let targets = [
 ["field_name","field_desc"],
 ["字段名","字段描述"],
 ["name","用户名"],
]
// 初始化
XlsxImporter.init(targets,'elem')
// 用户导入xlsx
// 用户选择要转换的列
```
