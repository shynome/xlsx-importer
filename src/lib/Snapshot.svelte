<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  /**@type {{[k:number]:number}}*/
  export let store;
  /**@type {string[][]}*/
  export let data;
  /**@type {[string,string][]}*/
  export let config;
  $: s = Object.keys(store).reduce((t, _k) => {
    /**@type {number}*/
    let k = /**@type {any}*/ (_k);
    let i = store[k];
    t[i] = t[i] || [];
    t[i].push(k);
    return t;
  }, /**@type {{[k:number]:number[]}}*/ ({}));
  $: d = data.map((raw) => {
    return config.map((_v, k) => {
      let cols = s[k];
      if (typeof cols === "undefined") {
        return "";
      }
      return cols
        .map((k) => raw[k])
        .filter((v) => typeof v != undefined)
        .join(",");
    });
  });
</script>

<div class="xlsx-importer-root">
  <div class="xlsx-importer-menu">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="xlsx-importer-btn" on:click={() => dispatch("xlsx-imported", d)}>通过</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="xlsx-importer-btn" on:click={() => dispatch("reselect")}>重新选择</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="xlsx-importer-btn" on:click={() => dispatch("close")}>关闭</div>
  </div>
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          {#each config as [name, desc]}
            <th>{desc}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each d as t}
          <tr>
            {#each t as v}
              <td>{v}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .xlsx-importer-root {
    position: relative;
    height: 100%;
  }
  .xlsx-importer-root .table-scroll {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  .xlsx-importer-menu {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    z-index: 2;
  }
  .xlsx-importer-menu .xlsx-importer-btn {
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
  table {
    border-collapse: collapse;
    font-size: 18px;
  }
  table tr:nth-child(even) {
    background-color: #f0f0f0;
  }
  table th {
    background-color: #000;
    color: #fff;
    /* font-size: 24px; */
    text-align: left;
    white-space: nowrap;
  }
  table td,
  table th {
    padding: 7px 10px;
    position: relative;
  }
</style>
