<script>
	import { onMount } from "svelte";
	import { initializeWebSocket, socket } from "./websocket";
	import { Router, Route, Link } from "svelte-routing";
	import Test from "./pages/Test.svelte";
	import Home from "./pages/Home.svelte";
	import Lobbies from "./pages/Lobbies.svelte";
	import Lobby from "./pages/Lobby.svelte";
	import Game from "./pages/Game.svelte";

	onMount(() => {
		initializeWebSocket();
	});

	/**
	 * @type {WebSocket}
	 */
	let ws;
	$: ws = $socket;

	function sendCustomMessage() {
		ws.send(
			JSON.stringify({
				messageType: 2,
				data: '{"data": "asdasd"}',
			}),
		);
	}
</script>

<Router>
	<nav class="navbar">
		<Link to="/">Home</Link>
		<Link to="/test">Test</Link>
		<Link to="/lobbies">Lobbies</Link>
	</nav>

	<Route path="/test" component={Test} />
	<Route path="/" component={Home} />
	<Route path="/lobbies" component={Lobbies} />
	<Route path="/lobby" component={Lobby} />
	<Route path="/game" component={Game} />
</Router>

<style>
	:global(body) {
		padding: 0;
	}

	.navbar {
		background-color: #333;
		padding: 1rem;
		display: flex;
		justify-content: flex-start;
	}

	.navbar :global(a) {
		color: white;
		text-decoration: none;
		margin-right: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		transition: background-color 0.3s ease;
	}

	.navbar :global(a:hover) {
		background-color: #555;
	}
</style>
