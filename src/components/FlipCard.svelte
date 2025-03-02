<script>
    import { ClassColor } from "../util";
    import { Card } from "../classes/Card";
    import { cards } from "../globals";
    import { socket } from "../websocket";
    import { cardClicked } from "../requests";

    export let id;

    /**
     * @type {WebSocket}
     */
    let ws;
    $: ws = $socket;

    /**
     * @type {Card}
     */
    let card;
    $: card = $cards[id];

    $: color = ClassColor[card.wowClass];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="card-container"
    on:click={() => {
        cardClicked(ws, id);
    }}
>
    <div
        class="no-drag no-select card {card.flipped
            ? 'flipped'
            : ''} {card.hidden ? 'hidden' : ''}"
    >
        <div class="card-face front"></div>
        <div class="card-face back" style="background-color: {color};">
            {card.name}
        </div>
    </div>
</div>

<style>
    .card-container {
        perspective: 1000px;
        width: 96px;
        height: 96px;
    }

    .card {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s;
    }

    .flipped {
        transform: rotateY(180deg);
    }

    .hidden {
        opacity: 0;
    }

    .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: bold;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .front {
        /*background: linear-gradient(135deg, #ff9a9e, #fad0c4);*/
        background-image: url("http://ihavenolif.win/static/iao.webp");
    }

    .back {
        /*background: linear-gradient(135deg, #a1c4fd, #c2e9fb);*/
        transform: rotateY(180deg);
    }

    /* Disable dragging */
    .no-drag {
        user-drag: none; /* Safari */
        -webkit-user-drag: none; /* Chrome, Opera */
        pointer-events: none; /* Prevent interaction */
    }

    /* Disable text selection */
    .no-select {
        user-select: none; /* Modern browsers */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE/Edge */
    }
</style>
