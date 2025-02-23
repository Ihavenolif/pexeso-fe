import { writable, get } from "svelte/store";
import { MessageType, GameStates } from "./util";
import { Lobby } from "./classes/Lobby";
import { lobbies, clientName, clientId, lobbyInfo, gameState, cards } from "./globals";
import { navigate } from "svelte-routing";
import { Card } from "./classes/Card"

export const socket = writable(null);

export function initializeWebSocket() {

    const ws = new WebSocket('ws://localhost:6969');

    ws.onopen = () => {
        console.log('WebSocket connection established');
        socket.set(ws);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        socket.set(null);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        socket.set(null);
    };

    ws.onmessage = (message) => {

        const data = JSON.parse(message.data);

        console.log(message.data)

        switch (data.messageType) {
            case MessageType.GET_LOBBIES:
                const lobbyList = data.Lobbies.map(lobby => new Lobby(lobby.name, lobby.playerCount, lobby.id));
                lobbies.set(lobbyList);
                console.log(lobbyList);
                break;
            case MessageType.ERROR:
                console.error('Server error:', data.error);
                break;
            case MessageType.LOGIN:
                if (get(gameState) != GameStates.LOGIN) {
                    return;
                }
                clientName.set(data.username);
                clientId.set(data.clientId);
                gameState.set(GameStates.LOBBY_SELECT);
                navigate("/lobbies");
                break;
            case MessageType.JOIN_LOBBY:
                if (get(gameState) != GameStates.LOBBY && get(gameState) != GameStates.LOBBY_SELECT) {
                    return;
                }

                handleJoinLobby(data);
                break;
            case MessageType.TOGGLE_READY:
                handleToggleReady(data);
                break;
            case MessageType.START_GAME:
                handleStartGame(data);
                break;
            case MessageType.CARD_CLICKED:
                handleCardClicked(data);
                break;
            case MessageType.TURN_EVALUATION:
                handleTurnEvaluation(data);
                break;
            default:
                console.log('Received message:', data);
        }
    }
}

function handleJoinLobby(data) {
    if (get(gameState) != GameStates.LOBBY) {
        gameState.set(GameStates.LOBBY);
    }

    console.log(data.Clients);

    lobbyInfo.set({
        clients: data.Clients,
        spectators: data.Spectators,
        id: data.id,
        name: data.name
    })

    navigate("/lobby")
}

function handleToggleReady(data) {
    if (get(gameState) != GameStates.LOBBY) {
        return;
    }

    let id = data.clientId;
    let isReady = data.isReady;

    let lobby = get(lobbyInfo);

    lobby.clients.forEach(client => {
        if (client.clientId == id) {
            client.isReady = isReady;
        }
    })

    lobbyInfo.set(lobby);
}

function handleStartGame(data) {
    if (get(gameState) != GameStates.LOBBY) {
        return;
    }

    /**
     * @type {Array[Card]}
     */
    let _cards = []

    for (let i = 0; i < data.cardCount; i++) {
        _cards[i] = new Card(i, "", 0, 0);
    }

    cards.set(_cards);
    gameState.set(GameStates.IN_GAME);

    navigate("/game")
}

function handleCardClicked(data) {
    if (get(gameState) != GameStates.IN_GAME) {
        return;
    }

    let cardClicked = new Card(data.id, data.name, data.wowClass, data.wowRole);
    cardClicked.flipped = true;

    let _cards = get(cards);

    _cards[cardClicked.id] = cardClicked;

    cards.set(_cards);
}

function handleTurnEvaluation(data) {
    if (get(gameState) != GameStates.IN_GAME) {
        return;
    }

    /**
     * @type {Boolean}
     */
    let wasGuessCorrect = data.wasGuessCorrect;

    let lobby = get(lobbyInfo);
    lobby.clients = data.Clients;
    lobbyInfo.set(lobby);

    /**
     * @type {Array[Card]}
     */
    let _cards = get(cards);

    if (wasGuessCorrect) {
        _cards.forEach((card) => {
            if (card.flipped) {
                card.hidden = true;
            }
        })
    }
    else {
        _cards.forEach((card) => {
            if (card.flipped) {
                card.flipped = false;
            }
        })
    }

    cards.set(_cards);
}