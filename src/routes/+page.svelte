<script>
  import { XlsxImporter } from "$lib";
</script>

<XlsxImporter
  on:xlsx-imported={(e) => console.log(e.detail)}
  config={[
    ["uid", "b站ID"],
    ["nickname", "昵称"],
    ["realname", "地址姓名"],
    ["phone", "手机"],
    ["addr", "地址"],
    ["remark", "备注"],
    ["a", "a"],
  ]}
/>
