## 简介

表单挑选少列导入工具

## 如何使用

```html
<link rel="stylesheet" href="./xlsx-importer.css" />
<script src="xlsx-importer.js"></script>
<div id="app"></div>
<script>
  const t = new XlsxImporter({
    target: document.getElementById("app"),
    props: {
      config: [
        ["name", "姓名"],
        ["phone", "手机号"],
        ["realname", "收件人"],
        ["addr", "地址"],
      ],
    },
  });
  t.$on("xlsx-imported", (e) => {
    console.log(e);
    console.log(e.detail);
  });
</script>
```
