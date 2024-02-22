<script lang="ts">
  import { slide } from 'svelte/transition';
  import QrCode from '@lib/components/QRCode.svelte';
  import DownloadBtn from './lib/components/buttons/DownloadBtn.svelte';
  import { onMount } from 'svelte';
  let text = 'Would you just try it before you start scanning things?';
  let expanded: boolean = false;
  const updateText = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      text = value;
    }
  };
  let promptEvent: Event & { prompt?: Function };
  onMount(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    text = params['urlText'] || params['bodyText'] || params['titleText'] || text;
  });
</script>

<svelte:window
  on:beforeinstallprompt={(event) => {
    event.preventDefault();
    promptEvent = event;
  }}
/>
<main class="flex max-w-xl mx-auto flex-col min-h-[100dvh] justify-center items-center gap-4 py-3">
  <div class="grow" />
  <h1 class="text-2xl md:text-4xl lg:text-5xl text-center font-bold text-primary font-heading">ShareAsQRCode.com</h1>
  {#if text}
    <QrCode {text} class="w-full max-w-xl fill-paper stroke-black" />
  {/if}
  <p class="text-2xl md:text-4xl lg:text-5xl font-bold text-primary font-heading max-w-xl text-center">Turn any text or link into a QR code instantly</p>
  <div class="flex w-72 lg:w-96">
    {#if !expanded}
      <button
        transition:slide={{ axis: 'x' }}
        on:click={() => {
          expanded = true;
        }}
        class="bg-secondary py-4 px-6 text-2xl rounded-xl w-72 min-w-0 whitespace-nowrap overflow-clip lg:w-96 max-w-xl text-paper font-actionCall"
      >
        Try Now Free</button
      >
    {:else}
      <input transition:slide={{ axis: 'x' }} on:input={updateText} on:change={updateText} type="text" class="py-4 px-1 font-actionCall text-2xl w-full max-w-xl rounded-xl min-w-0" placeholder="Type Here..." />
    {/if}
  </div>
  <div class="grow" />
  <div class="flex justify-around w-full gap-2">
    <DownloadBtn {text} />
    {#if promptEvent}
      <div class="flex flex-col items-center">
        <button
          on:click={() => {
            promptEvent?.prompt?.();
          }}
          class="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-secondary w-6 h-6" viewBox="0 0 25 24">
            <path d="M8.115 22C7.655 22 7.271 21.846 6.963 21.538C6.65433 21.2293 6.5 20.845 6.5 20.385V3.615C6.5 3.155 6.65433 2.771 6.963 2.463C7.271 2.15433 7.655 2 8.115 2H14.577V5.5H7.5V18.5H17.5V16.5H18.5V20.385C18.5 20.845 18.346 21.229 18.038 21.537C17.7293 21.8457 17.345 22 16.885 22H8.115ZM18.5 13.288L14.192 8.981L14.9 8.273L18 11.373V3.5H19V11.373L22.1 8.273L22.808 8.981L18.5 13.288Z" />
          </svg>
        </button>
        <span class="text-primary text-sm">Install App</span>
      </div>
    {/if}
    <div class="flex flex-col items-center">
      <button class="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" class="fill-secondary w-6 h-6">
          <path d="M8.5 21V19H11.5V5H8.5V3H16.5V5H13.5V19H16.5V21H8.5ZM18.55 7.05L23.5 12L18.55 16.95L17.136 15.536L20.672 12L17.136 8.464L18.55 7.05ZM6.45 7.05L7.864 8.464L4.328 12L7.864 15.536L6.45 16.95L1.5 12L6.45 7.05Z" />
        </svg>
      </button>
      <span class="text-primary text-sm">Input Type</span>
    </div>
    <div class="flex flex-col items-center">
      <button class="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" class="fill-secondary w-6 h-6">
          <path
            d="M12.5 4C13.5609 4 14.5783 4.42143 15.3284 5.17157C16.0786 5.92172 16.5 6.93913 16.5 8C16.5 9.06087 16.0786 10.0783 15.3284 10.8284C14.5783 11.5786 13.5609 12 12.5 12C11.4391 12 10.4217 11.5786 9.67157 10.8284C8.92143 10.0783 8.5 9.06087 8.5 8C8.5 6.93913 8.92143 5.92172 9.67157 5.17157C10.4217 4.42143 11.4391 4 12.5 4ZM12.5 6C11.9696 6 11.4609 6.21071 11.0858 6.58579C10.7107 6.96086 10.5 7.46957 10.5 8C10.5 8.53043 10.7107 9.03914 11.0858 9.41421C11.4609 9.78929 11.9696 10 12.5 10C13.0304 10 13.5391 9.78929 13.9142 9.41421C14.2893 9.03914 14.5 8.53043 14.5 8C14.5 7.46957 14.2893 6.96086 13.9142 6.58579C13.5391 6.21071 13.0304 6 12.5 6ZM12.5 13C15.17 13 20.5 14.33 20.5 17V20H4.5V17C4.5 14.33 9.83 13 12.5 13ZM12.5 14.9C9.53 14.9 6.4 16.36 6.4 17V18.1H18.6V17C18.6 16.36 15.47 14.9 12.5 14.9Z"
          />
        </svg>
      </button>
      <span class="text-primary text-sm">Profile</span>
    </div>
  </div>
</main>
