<script>
    import { socket } from "../websocket";
    import { lobbies } from "../globals";
    import { sendCustomMessage } from "../requests";
    import { getLobbies } from "../requests";
    import LobbyItem from "../components/LobbyItem.svelte";
    import { Lobby } from "../classes/Lobby";
    import { onMount } from "svelte";

    export let name;

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    /**
     * @type {Lobby[]}
     */
    let lobbyList;
    $: lobbyList = $lobbies;

    onMount(() => {
        getLobbies(ws);
    });
</script>

<main>
    <h1>Lobbies:</h1>

    <button
        on:click={() => {
            getLobbies(ws);
        }}
        >Reload lobbies
    </button>

    {#each lobbyList as lobby}
        <LobbyItem
            name={lobby.name}
            players={lobby.playerCount}
            id={lobby.id}
        />
    {/each}
</main>
