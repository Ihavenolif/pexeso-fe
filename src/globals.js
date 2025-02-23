import { writable } from "svelte/store";
import { GameStates } from "./util";
import { Card } from "./classes/Card";

export let lobbies = writable([]);
export let clientName = writable("");
export let clientId = writable(null);

export let lobbyInfo = writable(null);

export let gameState = writable(GameStates.LOGIN);

/**
 * @type {Writable<Card[]>}
 */
export let cards = writable([]);