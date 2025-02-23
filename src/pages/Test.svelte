<script>
    import Card from "../components/Card.svelte";
    import FlipCard from "../components/FlipCard.svelte";
    import { socket } from "../websocket";
    import { sendCustomMessage } from "../requests";
    import { getLobbies } from "../requests";

    export let name;

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;
</script>

<main>
    <h1>TOHLE JE TESTOVACI STRANKA!</h1>

    <button
        on:click={() => {
            getLobbies(ws);
        }}
        >asdasdasd
    </button>

    <FlipCard></FlipCard>
</main>

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
