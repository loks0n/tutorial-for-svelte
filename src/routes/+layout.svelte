<script>
  import "@appwrite.io/pink";
  import "@appwrite.io/pink-icons";
  import { ideas } from "$lib/stores/ideas";
  import { user } from "$lib/stores/user";
  import { onMount } from "svelte";

  onMount(async () => {
    user.init();
    ideas.init();
  });
</script>

<div class="u-padding-16 u-max-width-600 u-full-width" style="margin: 0 auto;">
  <nav class="u-flex u-main-space-between u-cross-center u-gap-16 u-padding-16">
    <a class="heading-level-6" href="/">Idea Tracker</a>
    <div class="u-flex u-gap-16 u-cross-center">
      {#if $user}
        <span>{$user.email}</span>
        <button class="button" type="button" on:click={user.logout}
          >Logout</button
        >
      {:else}
        <a class="button" href="/login">Login</a>
      {/if}
    </div>
  </nav>
  <main class="u-flex-vertical u-gap-16">
    <slot />
  </main>
</div>
