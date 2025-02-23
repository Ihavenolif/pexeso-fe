<script>
    import { socket } from "../websocket";
    import { cards, lobbyInfo, playerOnTurn } from "../globals";
    import { ClassColor, WowRole } from "../util";
    import FlipCard from "../components/FlipCard.svelte";

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    let lobby;
    $: lobby = $lobbyInfo;

    $: player1Tanks = lobby.clients[0].characters.filter(
        (character) => character.wowRole === WowRole.TANK,
    );
    $: player1Healers = lobby.clients[0].characters.filter(
        (character) => character.wowRole === WowRole.HEALER,
    );
    $: player1Dps = lobby.clients[0].characters.filter(
        (character) => character.wowRole === WowRole.DPS,
    );
    $: player2Tanks = lobby.clients[1].characters.filter(
        (character) => character.wowRole === WowRole.TANK,
    );
    $: player2Healers = lobby.clients[1].characters.filter(
        (character) => character.wowRole === WowRole.HEALER,
    );
    $: player2Dps = lobby.clients[1].characters.filter(
        (character) => character.wowRole === WowRole.DPS,
    );

    $: onTurn = $playerOnTurn;
</script>

<main>
    <div class="column-container">
        <div class="column left">
            {#if onTurn == 0}
                <span style="color: red;"><h1>{lobby.clients[0].name}</h1></span
                >
            {:else}
                <h1>{lobby.clients[0].name}</h1>
            {/if}

            {#if player1Tanks.length > 0}
                <h3>Tanks</h3>
                {#each player1Tanks as character}
                    <p style="color: {ClassColor[character.wowClass]}">
                        {character.name}
                    </p>
                {/each}
            {/if}

            {#if player1Healers.length > 0}
                <h3>Healers</h3>
                {#each player1Healers as character}
                    <p style="color: {ClassColor[character.wowClass]}">
                        {character.name}
                    </p>
                {/each}
            {/if}

            {#if player1Dps.length > 0}
                <h3>DPS</h3>
                {#each player1Dps as character}
                    <p style="color: {ClassColor[character.wowClass]}">
                        {character.name}
                    </p>
                {/each}
            {/if}
        </div>
        <div class="column middle">
            <div class="cards-container">
                {#each $cards as card}
                    <FlipCard id={card.id} />
                {/each}
            </div>
        </div>
        <div class="column right" style="text-align: right;">
            {#if onTurn == 1}
                <span style="color: red;"><h1>{lobby.clients[1].name}</h1></span
                >
            {:else}
                <h1>{lobby.clients[1].name}</h1>
            {/if}

            {#if player2Tanks.length > 0}
                <h3>Tanks</h3>
                {#each player2Tanks as character}
                    <p style="color: {ClassColor[character.wowClass]}">
                        {character.name}
                    </p>
                {/each}
            {/if}

            {#if player2Healers.length > 0}
                <h3>Healers</h3>
                {#each player2Healers as character}
                    <p style="color: {ClassColor[character.wowClass]}">
                        {character.name}
                    </p>
                {/each}
            {/if}

            {#if player2Dps.length > 0}
                <h3>DPS</h3>
                {#each player2Dps as character}
                    <p style="color: {ClassColor[character.wowClass]}">
                        {character.name}
                    </p>
                {/each}
            {/if}
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
