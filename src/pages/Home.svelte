<script>
    import { socket } from "../websocket";
    import { login } from "../requests";

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    let username = "";
</script>

<main>
    <h1>This is the home site!</h1>
    <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p>
</main>

<input bind:value={username} type="text" placeholder="Username" />

<button
    on:click={() => {
        login(ws, username);
    }}>asdasdasd</button
>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
