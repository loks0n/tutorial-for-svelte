<script>
  import { user } from "$lib/stores/user";

  let email = "";
  let password = "";
</script>

<section class="card">
  <h1 class="heading-level-1">Login or register</h1>
  <form
    class="form u-margin-block-start-16 u-gap-16 u-width-full-line u-max-width-500"
  >
    <input
      class="input-text"
      type="email"
      placeholder="Email"
      bind:value={email}
    />
    <input
      class="input-password"
      type="password"
      placeholder="Password"
      bind:value={password}
    />
    <div class="u-flex u-gap-8">
      <button
        class="button"
        type="button"
        on:click={() => user.login(email, password)}>Login</button
      >
      <button
        class="button"
        type="button"
        on:click={() => user.register(email, password)}>Register</button
      >
    </div>
  </form>
</section>
