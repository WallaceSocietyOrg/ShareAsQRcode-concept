<script lang="ts">
  import QRCode from "qrcode";
  import clickOutside from "@lib/actions/clickOutside";
  let downloadDropDown: boolean = false;
  export let text: string;
  const downloadURL = (
    imageURL: string,
    type: "image/png" | "image/jpeg" | "image/webp"
  ) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = text + "." + type.split("/")[1];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const download = (type: "image/png" | "image/jpeg" | "image/webp") => () => {
    QRCode.toDataURL(text, { type, scale: 20, width: 1200 }).then(
      (url: string) => {
        downloadURL(url, type);
      }
    );
    downloadDropDown = false;
  };

  const share = (type: "image/png" | "image/jpeg" | "image/webp") => () => {
    QRCode.toDataURL(text, { type }).then((url: string) => {
      fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], text + "." + type.split("/")[1], { type });
        })
        .then((file) => {
          const shareData = {
            title: text,
            url: window.location.toString(),
            descripton: text,
            files: [file],
          };
          if (navigator.canShare(shareData)) {
            navigator.share(shareData);
          }
        });
    });
    downloadDropDown = false;
  };
</script>

<div class="flex flex-col items-center">
  <div class="relative">
    <button
      on:click={() => {
        downloadDropDown = !downloadDropDown;
      }}
      class="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-secondary w-6 h-6"
        viewBox="0 0 25 24"
      >
        <path
          d="M20 18V21H5V18H3.5V21C3.5 21.3978 3.65804 21.7794 3.93934 22.0607C4.22064 22.342 4.60218 22.5 5 22.5H20C20.3978 22.5 20.7794 22.342 21.0607 22.0607C21.342 21.7794 21.5 21.3978 21.5 21V18H20ZM20 10.5L18.9425 9.4425L13.25 15.1275V1.5H11.75V15.1275L6.0575 9.4425L5 10.5L12.5 18L20 10.5Z"
        />
      </svg></button
    >

    <div
      use:clickOutside
      on:click_outside={() => (downloadDropDown = false)}
      class={[
        "transition-all ease-out duration-100 absolute bottom-full left-0 z-10 mt-2.5 w-40 items-center origin-bottom-left flex flex-col rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none",
        downloadDropDown
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none",
      ].join(" ")}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabindex="-1"
    >
      <button
        on:click={share("image/png")}
        class="block px-3 py-1 text-sm leading-6 text-gray-900"
        role="menuitem">Share Image</button
      >
      <button
        on:click={download("image/png")}
        class="block px-3 py-1 text-sm leading-6 text-gray-900"
        role="menuitem">Download as PNG</button
      >
      <button
        on:click={download("image/jpeg")}
        class="block px-3 py-1 text-sm leading-6 text-gray-900"
        role="menuitem">Download as JPEG</button
      >
      <button
        on:click={download("image/webp")}
        class="block px-3 py-1 text-sm leading-6 text-gray-900"
        role="menuitem">Download as WEBP</button
      >
    </div>
  </div>
  <span class="text-primary text-sm">Download</span>
</div>
