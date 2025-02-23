<script>
    import { socket } from "../websocket";
    import { cards, lobbyInfo } from "../globals";
    import { ClassColor } from "../util";
    import FlipCard from "../components/FlipCard.svelte";

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    let lobby;
    $: lobby = $lobbyInfo;
</script>

<main>
    <div class="column-container">
        <div class="column left">
            {#each lobby.clients[0].characters as character}
                <p style="color: {ClassColor[character.wowClass]}">
                    {character.name}
                </p>
            {/each}
        </div>
        <div class="column middle">
            <div class="cards-container">
                {#each $cards as card}
                    <FlipCard id={card.id} />
                {/each}
            </div>
        </div>
        <div class="column right">
            {#each lobby.clients[1].characters as character}
                <p style="color: {ClassColor[character.wowClass]}">
                    {character.name}
                </p>
            {/each}
        </div>
    </div>
</main>

<style>
    .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, 100px);
        grid-auto-rows: 100px;
        gap: 5px; /* Adjust if you want space between tiles */
    }

    .column-container {
        display: flex;
        width: 100%;
    }

    .column {
        padding: 10px;
        box-sizing: border-box;
    }

    .left {
        width: 20%;
    }

    .middle {
        width: 60%;
    }

    .right {
        width: 20%;
    }
</style>
