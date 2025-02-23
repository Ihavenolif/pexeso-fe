<script>
    import { clientId } from "../globals";
    import { socket } from "../websocket";
    import { toggleReady } from "../requests";

    export let name = "Player";
    export let isReady = false;
    export let id;
</script>

<div class="player">
    <div class="info">
        <strong>{name}</strong>
        <p>{isReady ? "Ready" : "Not ready"}</p>
    </div>
    {#if id == $clientId}
        <button
            class="ready {isReady ? 'ready' : 'waiting'}"
            on:click={() => {
                toggleReady($socket);
            }}
        >
            {isReady ? "Unready" : "Ready"}
        </button>
    {/if}
</div>

<style>
    .player {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: #f8f8f8;
    }
    .info {
        flex-grow: 1;
    }
    .ready {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .ready.ready {
        background: green;
        color: white;
    }
    .ready.waiting {
        background: red;
        color: white;
    }
</style>
