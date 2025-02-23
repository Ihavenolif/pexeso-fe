import { MessageType } from "./util";

export function sendCustomMessage(ws) {
    ws.send(
        JSON.stringify({
            messageType: MessageType.CUSTOM_DATA,
            data: '{"data": "asdasd"}',
        }),
    );
}

export function getLobbies(ws) {
    ws.send(
        JSON.stringify({
            messageType: MessageType.GET_LOBBIES,
        }),
    );
}

export function joinLobby(ws, lobbyId) {
    ws.send(
        JSON.stringify({
            messageType: MessageType.JOIN_LOBBY,
            data: JSON.stringify({
                lobbyId: lobbyId
            })
        }),
    );
}

export function login(ws, username) {
    ws.send(
        JSON.stringify({
            messageType: MessageType.LOGIN,
            data: JSON.stringify({
                username: username
            })
        })
    )
}

export function toggleReady(ws) {
    ws.send(
        JSON.stringify({
            messageType: MessageType.TOGGLE_READY,
        }),
    );
}

export function joinAsSpectator(ws, lobbyId) {
    ws.send(
        JSON.stringify({
            messageType: MessageType.JOIN_AS_SPECTATOR,
            data: JSON.stringify({
                lobbyId: lobbyId
            })
        }),
    );
}

export function startGame(ws) {
    ws.send(JSON.stringify({
        messageType: MessageType.START_GAME
    }));
}

export function cardClicked(ws, cardId) {
    ws.send(JSON.stringify({
        messageType: MessageType.CARD_CLICKED,
        data: JSON.stringify({
            id: cardId
        })
    }));
}