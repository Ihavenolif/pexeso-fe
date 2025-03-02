<script>
    import { socket } from "../websocket";
    import { lobbyInfo } from "../globals";
    import PlayerInLobby from "../components/PlayerInLobby.svelte";
    import { startGame } from "../requests";

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    let lobby;
    $: lobby = $lobbyInfo;

    $: allPlayersReady = lobby.clients.every((player) => player.isReady);
</script>

<main>
    <h1>{lobby.name}</h1>

    <h3>Players:</h3>

    {#each lobby.clients as player}
        <PlayerInLobby
            name={player.name}
            id={player.clientId}
            isReady={player.isReady}
        />
    {/each}

    {#if lobby.spectators.length > 0}
        <h3>Spectators:</h3>

        {#each lobby.spectators as spectator}
            <p>{spectator.name}</p>
        {/each}
    {/if}

    {#if lobby.clients.length < 2 || !allPlayersReady}
        <button disabled>Start game</button>
    {:else}
        <button
            on:click={() => {
                startGame(ws);
            }}>Start game</button
        >
    {/if}
</main>

<style>
    main {
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
