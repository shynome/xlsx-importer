<script>
  import { createEventDispatcher } from "svelte";
  /**@type {[string,string][]}*/
  export let config;
  import * as XLSX from "xlsx";
  import XlsxImporter from "./XlsxImporter.svelte";
  /**@type {FileList} */
  let files;
  /**@type {XLSX.WorkSheet}*/
  let sheet;
  let pasring = false;
  let open = false;
  const dispatch = createEventDispatcher();

  const handleClose = () => {
    open = false;
  };
  const handleSubmit = () => {
    Promise.resolve()
      .finally(() => {
        pasring = true;
      })
      .then(async () => {
        let file = files[0];
        let buf = await file.arrayBuffer();
        const workbox = XLSX.read(buf);
        sheet = workbox.Sheets[workbox.SheetNames[0]];
      })
      .then(() => {
        open = true;
      })
      .finally(() => {
        pasring = false;
      });
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="file" disabled={pasring} accept=".xlsx" bind:files required />
  <button type="submit">解析</button>
</form>
<div class="xlsx-importer-modal" class:open>
  <XlsxImporter
    {sheet}
    {config}
    on:xlsx-imported={(e) => {
      open = false;
      dispatch("xlsx-imported", e.detail);
    }}
    on:close={handleClose}
  />
</div>

<style>
  .xlsx-importer-modal {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  .xlsx-importer-modal {
    visibility: hidden;
    opacity: 0;
  }
  .xlsx-importer-modal.open {
    visibility: visible;
    opacity: 1;
  }
</style>
