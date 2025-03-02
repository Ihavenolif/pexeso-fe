<script>
    import { socket } from "../websocket";
    import { cards, lobbyInfo, playerOnTurn, clientName } from "../globals";
    import { ClassColor, WowRole } from "../util";
    import FlipCard from "../components/FlipCard.svelte";
    import { gamePaused } from "../requests";
    import CharacterItem from "../components/CharacterItem.svelte";

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    let lobby;
    $: lobby = $lobbyInfo;

    let isPaused;
    $: isPaused = $lobbyInfo.paused;

    let spectatorUsernames;
    $: spectatorUsernames = $lobbyInfo.spectators.map(
        (spectator) => spectator.name,
    );

    let localPlayerUsername;
    $: localPlayerUsername = $clientName;

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
                <span style="color: red;"
                    ><h1 style="margin: 1em;">{lobby.clients[0].name}</h1></span
                >
            {:else}
                <h1 style="margin: 1em;">{lobby.clients[0].name}</h1>
            {/if}

            {#if player1Tanks.length > 0}
                <h3 style="margin: 0.7em;">Tanks</h3>
                {#each player1Tanks as character}
                    <CharacterItem characterInfo={character}></CharacterItem>
                {/each}
            {/if}

            {#if player1Healers.length > 0}
                <h3 style="margin: 0.7em;">Healers</h3>
                {#each player1Healers as character}
                    <CharacterItem characterInfo={character}></CharacterItem>
                {/each}
            {/if}

            {#if player1Dps.length > 0}
                <h3 style="margin: 0.7em;">DPS</h3>
                {#each player1Dps as character}
                    <CharacterItem characterInfo={character}></CharacterItem>
                {/each}
            {/if}
        </div>
        <div class="column middle">
            <div class="cards-container">
                {#each $cards as card}
                    <FlipCard id={card.id} />
                {/each}
            </div>

            <div class="sticky-center">
                {#if isPaused}
                    <p class="paused">⏸️ Paused</p>
                {/if}

                {#if spectatorUsernames.includes(localPlayerUsername)}
                    <button
                        class="btn"
                        on:click={() => {
                            gamePaused(ws);
                        }}
                    >
                        {isPaused ? "Resume" : "Pause"}
                    </button>
                {/if}
            </div>
        </div>
        <div class="column right" style="text-align: right;">
            {#if onTurn == 1}
                <span style="color: red;"
                    ><h1 style="margin: 1em;">{lobby.clients[1].name}</h1></span
                >
            {:else}
                <h1 style="margin: 1em;">{lobby.clients[1].name}</h1>
            {/if}

            {#if player2Tanks.length > 0}
                <h3 style="margin: 0.7em;">Tanks</h3>
                {#each player2Tanks as character}
                    <CharacterItem characterInfo={character} isRight={true}
                    ></CharacterItem>
                {/each}
            {/if}

            {#if player2Healers.length > 0}
                <h3 style="margin: 0.7em;">Healers</h3>
                {#each player2Healers as character}
                    <CharacterItem characterInfo={character} isRight={true}
                    ></CharacterItem>
                {/each}
            {/if}

            {#if player2Dps.length > 0}
                <h3 style="margin: 0.7em;">DPS</h3>
                {#each player2Dps as character}
                    <CharacterItem characterInfo={character} isRight={true}
                    ></CharacterItem>
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
        padding: 0;
    }

    .middle {
        width: 60%;
    }

    .right {
        width: 20%;
        padding: 0;
    }

    .sticky-center {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .btn {
        padding: 0.5rem 1rem;
        background-color: #0077ff;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .btn:hover {
        background-color: #0055cc;
    }

    .paused {
        font-size: 1.2rem;
        color: #ff4444;
    }
</style>
