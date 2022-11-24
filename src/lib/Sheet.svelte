<script>
  import { onMount, createEventDispatcher } from "svelte";
  import * as XLSX from "xlsx";
  /**@type {{[k:number]:number}}*/
  export let store = {};
  /**@type {import("xlsx").WorkSheet}*/
  export let sheet;
  $: h = sheet
    ? XLSX.utils.sheet_to_html(sheet, { header: "", footer: "" })
    : "";
  let changed_count = 0;
  $: {
    sheet;
    changed_count++;
    store = {};
  }
  export let now_select = 0;
  const dispatch = createEventDispatcher();
  /**@type {HTMLDivElement}*/
  let root;
  /**@type {HTMLElement[]}*/
  let tds = [];
  $: now_select_className = "xlsx-importer-order-" + now_select;

  /**
   * @param i {number}
   */
  function select(i) {
    if (store[i] == now_select) {
      delete store[i];
    } else {
      store[i] = now_select;
    }
    // console.log(store);
  }
  const resetStore = () => {
    store = {};
    apply_changes();
  };
  function apply_changes() {
    Array.prototype.forEach.call(
      tds,
      /**
       * @param td {HTMLElement}
       * @param i {number}
       */ (td, i) => {
        let selectedBy = store[i];
        td.className = "";

        if (typeof selectedBy != "undefined") {
          td.classList.add("selected", `xlsx-importer-order-${selectedBy}`);
        } else {
        }
      }
    );
  }
  onMount(() => {
    function setTds() {
      /**@ts-ignore */
      tds = root.querySelectorAll("tr:first-child td");
    }
    let observer = new MutationObserver(setTds);
    setTds();
    apply_changes();
    observer.observe(root, {
      attributeFilter: ["data-changed-count"],
      attributes: true,
      attributeOldValue: false,
      characterData: false,
      characterDataOldValue: false,
      childList: false,
      subtree: false,
    });

    function activeOnly(i = 0) {
      let t = tds[i];
      for (let td of tds) {
        if (td.classList.contains("selected")) {
          continue;
        }
        td.classList.remove("hover", now_select_className);
        if (t === td) {
          td.classList.add("hover", now_select_className);
        }
      }
    }
    /**
     * @param t {HTMLElement}
     */
    function indexOf(t) {
      return Array.prototype.indexOf.call(
        /**@type {HTMLElement}*/ (t.parentElement).childNodes,
        t
      );
    }
    /**@type {any}*/
    let last = null;
    /**
     * @param e {any}
     */
    function handleMouse(e) {
      /**@type {HTMLElement}*/
      let t = e.target;
      if (t == last) {
        return;
      }
      last = t;
      if (t.tagName != "TD") {
        return;
      }
      let i = indexOf(t);
      activeOnly(i);
    }
    root.addEventListener("mousemove", handleMouse);
    root.addEventListener("mouseleave", () => activeOnly(-1));
    root.addEventListener("mouseout", () => activeOnly(-1));
    root.addEventListener("click", (e) => {
      /**@type {HTMLElement}*/
      let t = /**@type {any}*/ (e.target);
      if (t.tagName != "TD") {
        return;
      }
      let i = indexOf(t);
      select(i);
      apply_changes();
    });
    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="right-btns">
  <div class="btn finish" on:click={() => dispatch("finished")}>完成</div>
  <div class="btn reset" on:click={resetStore}>重新选择</div>
  <div class="btn" on:click={() => dispatch("close")}>关闭</div>
</div>
<div class="sheet" bind:this={root} data-changed-count={changed_count}>
  {#if sheet}
    {@html h}
  {/if}
</div>

<style>
  .right-btns {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    z-index: 2;
  }
  .right-btns .btn {
    user-select: none;
    text-align: center;
    margin: 10px 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 15px;
    padding-left: 30px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    cursor: pointer;
  }
  .sheet {
    padding-bottom: 300px;
  }
  .sheet :global(table) {
    position: relative;
    border-collapse: collapse;
    border: 1px solid;
    overflow: hidden;
  }
  .sheet :global(table tr:nth-child(even)) {
    background-color: #f0f0f0;
  }
  .sheet :global(table td) {
    padding: 7px 10px;
    position: relative;
    min-width: 50px;
  }
  .sheet :global(table td:empty) {
    min-width: 0;
    padding: 0;
  }
  .sheet :global(table tr:first-child > td::after) {
    /* top: 50px; */
  }
  .sheet :global(table tr:first-child > td::before) {
    user-select: none;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50000px;
    opacity: 0.8;
    z-index: 1;
    border-right: 1px solid #fff;
    visibility: hidden;
  }
  .sheet :global(table tr:first-child > td.hover::before),
  .sheet :global(table tr:first-child > td.selected::before) {
    visibility: visible;
  }
  .sheet :global(table tr td) {
    cursor: pointer;
  }
  /* .sheet :global(table tr:first-child > td.hover) {
    background-color: transparent !important;
  } */
</style>
