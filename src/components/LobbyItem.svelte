<script>
    export let name = "Lobby Name";
    export let players = 0;
    export let maxPlayers = 2;
    export let id;

    import { joinLobby, joinAsSpectator } from "../requests";
    import { socket } from "../websocket";

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;
</script>

<div class="lobby-item">
    <span class="lobby-name">{name}</span>
    <span class="player-count">{players} / {maxPlayers}</span>
    <button
        class="join-button"
        on:click={() => {
            joinLobby(ws, id);
        }}>Join</button
    >

    <button
        class="join-button"
        on:click={() => {
            joinAsSpectator(ws, id);
        }}>Join as Spectator</button
    >
</div>

<style>
    .lobby-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        background: #f9f9f9;
        border-radius: 5px;
    }

    .lobby-name {
        font-weight: bold;
    }

    .player-count {
        color: #666;
    }

    .join-button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
    }

    .join-button:hover {
        background-color: #0056b3;
    }
</style>
