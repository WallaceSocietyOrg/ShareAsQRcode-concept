<script lang="ts">
  import GenerateQR from "@lib/actions/GenerateQR";
  let clazz: string = "";
  export { clazz as class };
  export let text: string = "";
</script>

<div use:GenerateQR={{ text, class: clazz }} class="contents" />
