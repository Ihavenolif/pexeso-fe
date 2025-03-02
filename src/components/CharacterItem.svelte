<script>
    import { ClassColor } from "../util";

    export let characterInfo;
    export let isRight = false;
</script>

<p
    style="background: linear-gradient(to {isRight
        ? 'left'
        : 'right'}, {ClassColor[characterInfo.wowClass]}, #ffffff);"
>
    {characterInfo.name}
</p>

<style>
    p {
        font-weight: bold;
        padding: 10px;
        margin: 0px;
    }
</style>
