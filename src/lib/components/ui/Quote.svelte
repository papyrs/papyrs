<script lang="ts">
  import {fade} from 'svelte/transition';
  import {onDestroy, onMount} from 'svelte';

  const quotes: string[] = [
    "\"I'm sorry, Dave. I'm afraid I can't do that.\" - HAL, 2001: A Space Odyssey",
    '"If I\'m not back in five minutes, just wait longer." - Ace Ventura',
    '"Some days, you just can\'t get rid of a bomb!" - Adam West, Batman & Robin',
    '"Shall we play a game?" - Joshua, WarGames',
    'Bill, strange things are afoot at the Circle K." - Ted, Bill & Ted\'s Excellent Adventure',
    '"Never argue with the data." - Sheen, Jimmy Neutron',
    '"Ray, if someone asks you if you\'re a god, you say YES!" - Winston, Ghostbusters',
    '"Greetings, programs!" -Flynn, TRON',
    '"Try not. Do, or do not. There is no try." - Yoda, The Empire Strikes Back',
    '"Don\'t call me a mindless philosopher, you overweight blob of grease!" - C3PO, Star Wars'
  ];

  let index: number = Math.floor(Math.random() * quotes.length);

  // eslint-disable-next-line
  let timer;
  let visible = false;

  onMount(() => (timer = setTimeout(() => (visible = true), 250)));
  onDestroy(() => clearTimeout(timer));
</script>

{#if visible}
  <p transition:fade={{delay: 250}}>{quotes[index]}</p>
{/if}

<style lang="scss">
  p {
    position: absolute;
    top: calc(50% + var(--spinner-size) + 2.45rem);
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: var(--font-size-small);
    max-width: 320px;
  }
</style>
