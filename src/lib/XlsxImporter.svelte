<script>
  import * as XLSX from "xlsx";
  import Sheet from "./Sheet.svelte";
  import Targets from "./Targets.svelte";
  import Snapshot from "./Snapshot.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  /**@type {[string,string][]}*/
  export let config;
  /**@type {import("xlsx").WorkSheet}*/
  export let sheet;
  let now_select = 0;
  /**@type {{[k:number]:number}}*/
  let store = {};

  let snapshot = false;
  /**@type {string[][]}*/
  let snapshotData;
  const handleFinish = () => {
    snapshot = true;
    snapshotData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  };
</script>

<div class="xlsx-importer-container">
  {#if sheet}
    <div class="xlsx-importer-sheet-scroll">
      <Sheet
        {sheet}
        {now_select}
        bind:store
        on:finished={handleFinish}
        on:close
      />
    </div>
    <Targets targets={config} bind:selected={now_select} />
  {/if}
  {#if snapshot}
    <div class="xlsx-importer-snapshot">
      <Snapshot
        {config}
        {store}
        data={snapshotData}
        on:reselect={() => (snapshot = false)}
        on:xlsx-imported
        on:close
      />
    </div>
  {/if}
</div>

<style>
  .xlsx-importer-container {
    position: relative;
    display: inline-block;
    padding: 0 2vw;
    overflow: hidden;
  }
  .xlsx-importer-sheet-scroll {
    overflow-y: scroll;
    max-height: 95vh;
    padding-bottom: 1px;
  }
  .xlsx-importer-snapshot {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  :global([class*="xlsx-importer-order-"]::after) {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    font-size: 30px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 40px;
    border: 4px solid;
    font-weight: 700;
    margin: 10px;
    z-index: 99;
    transition: all 0.1s;
  }
  :global([class*="xlsx-importer-order-"].selected::after) {
    color: #000;
  }
  :global(.xlsx-importer-order-0, .xlsx-importer-order-0::before) {
    background-color: hsla(335, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-0::after) {
    content: "0";
  }
  :global(.xlsx-importer-order-1, .xlsx-importer-order-1::before) {
    background-color: hsla(12, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-1::after) {
    content: "1";
  }
  :global(.xlsx-importer-order-2, .xlsx-importer-order-2::before) {
    background-color: hsla(36, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-2::after) {
    content: "2";
  }
  :global(.xlsx-importer-order-3, .xlsx-importer-order-3::before) {
    background-color: hsla(76, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-3::after) {
    content: "3";
  }
  :global(.xlsx-importer-order-4, .xlsx-importer-order-4::before) {
    background-color: hsla(126, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-4::after) {
    content: "4";
  }
  :global(.xlsx-importer-order-5, .xlsx-importer-order-5::before) {
    background-color: hsla(215, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-5::after) {
    content: "5";
  }
  :global(.xlsx-importer-order-6, .xlsx-importer-order-6::before) {
    background-color: hsla(246, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-6::after) {
    content: "6";
  }
  :global(.xlsx-importer-order-7, .xlsx-importer-order-7::before) {
    background-color: hsla(277, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-7::after) {
    content: "7";
  }
  :global(.xlsx-importer-order-8, .xlsx-importer-order-8::before) {
    background-color: hsla(303, 70%, 51%, 1);
  }
  :global(.xlsx-importer-order-8::after) {
    content: "8";
  }
</style>
