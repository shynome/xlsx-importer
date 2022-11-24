<script>
  import { XlsxImporter } from "$lib";
  import * as XLSX from "xlsx";

  /**@type {FileList} */
  let files;
  /**@type {XLSX.WorkSheet}*/
  let sheet;
  let pasring = false;
  /**
   * @param file {File}
   */
  async function parse(file) {
    let buf = await file.arrayBuffer();
    const workbox = XLSX.read(buf);
    sheet = workbox.Sheets[workbox.SheetNames[0]];
  }
  $: {
    files &&
      Promise.resolve()
        .finally(() => (pasring = true))
        .then(() => parse(files[0]))
        .finally(() => (pasring = false));
  }
</script>

<input type="file" disabled={pasring} accept=".xlsx" bind:files />
<XlsxImporter
  {sheet}
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
