<script>
  import { user } from "$lib/stores/user";
  import { ideas } from "$lib/stores/ideas";

  let title = "";
  let description = "";
</script>

{#if $user}
  <section class="card">
    <h2 class="heading-level-2">Submit Idea</h2>

    <form class="u-flex-vertical u-margin-block-start-16 u-gap-8">
      <input
        class="input-text"
        type="text"
        placeholder="Title"
        bind:value={title}
      />
      <textarea
        class="input-text"
        placeholder="Description"
        bind:value={description}
      />
      <button
        class="button"
        type="button"
        on:click={async () => {
          ideas.add({ userId: $user.$id, title, description });
          title = "";
          description = "";
        }}>Submit</button
      >
    </form>
  </section>
{:else}
  <section class="card"><p>Please login to submit an idea.</p></section>
{/if}
<section class="card">
  <h2 class="heading-level-2">Latest Ideas</h2>
  <ul class="boxes-wrapper u-margin-block-start-16">
    {#each $ideas as idea}
      <li class="box u-flex-vertical u-gap-8">
        <strong class="u-bold">{idea.title}</strong>
        <p>{idea.description}</p>
        {#if $user && idea.userId === $user.$id}
          <button
            class="button is-secondary"
            type="button"
            on:click={() => ideas.remove(idea.$id)}>Remove</button
          >
        {/if}
      </li>
    {/each}
  </ul>
</section>
