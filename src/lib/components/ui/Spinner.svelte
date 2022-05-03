<!-- adapted from pen: https://codepen.io/mimoh/pen/VmVqPB -->

<div class="spinner" />

<style lang="scss">
  .spinner {
    display: block;

    background: transparent;
    border: 3px solid var(--spinner-color, black);

    width: var(--spinner-size);
    height: var(--spinner-size);

    position: var(--spinner-position, absolute);
    top: calc(50% - (var(--spinner-size) / 2));
    left: calc(50% - (var(--spinner-size) / 2));

    animation: spinner-rotate 1.2s infinite linear;
  }

  /* -global- */
  @keyframes -global-spinner-rotate {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>
