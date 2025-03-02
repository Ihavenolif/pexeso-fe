<script>
    import { socket } from "../websocket";
    import { login } from "../requests";
    import Game from "./Game.svelte";
    import { clientId, lobbyInfo } from "../globals";

    lobbyInfo.set({
        clients: [
            {
                name: "one",
                clientId: 0,
                isReady: true,
                isSpectator: false,
                characters: [
                    {
                        name: "Nolife",
                        id: 0,
                        wowClass: 1,
                        wowRole: 1,
                    },
                ],
            },
            {
                name: "two",
                clientId: 1,
                isReady: true,
                isSpectator: false,
                characters: [],
            },
        ],
        spectators: [],
        id: 0,
        name: "test",
        paused: false,
    });

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    let username = "";
</script>

<main>
    <h1>Vítej v IAO Pexeso-like!</h1>

    <input bind:value={username} type="text" placeholder="Username" />

    <button
        on:click={() => {
            login(ws, username);
        }}>Login</button
    >

    <Game></Game>
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
