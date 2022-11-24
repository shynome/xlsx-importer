<script>
  /**@type {[string,string][]}*/
  export let targets;
  export let selected = 0;
</script>

<div class="targets">
  <ul>
    {#each targets as [name, desc], i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        id={"key-" + name}
        class={"xlsx-importer-order-" + i}
        class:selected={selected == i}
        on:click={() => (selected = i)}
      >
        {desc}
      </li>
    {/each}
  </ul>
</div>

<style>
  .targets {
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    z-index: 99;
    text-align: center;
    font-size: 0;
  }
  ul {
    font-size: 27px;
    display: inline-flex;
    align-items: flex-end;
    list-style: none;
    padding: 0;
    vertical-align: baseline;
    margin: 0;
    transform: translateY(-100%);
  }
  ul li {
    display: inline-block;
    width: 100px;
    line-height: 100px;
    height: 150px;
    opacity: 0.8;
    position: relative;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    padding: 70px 0 50px;
    transform: translateY(50px);
    margin: 0 5px;
    transition: all 0.1s;
    writing-mode: vertical-lr;
    cursor: pointer;
  }
  ul li.selected {
    transform: translateY(0);
  }
  ul li:hover {
    transform: translateY(-20px);
  }
  ul li::after {
    left: 50%;
    transform: translateX(-75%);
    writing-mode: horizontal-tb;
  }
</style>
