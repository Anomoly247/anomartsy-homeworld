# Shared AO Bridge Contract

The shared bridge lives at `assets/ao-bridge.js` and preserves the player context while they move between Homeworld, games, worlds, and applications.

## URL contract

Connected destinations may receive:

```text
?house=1&mount=aurora&return=https%3A%2F%2Fanomartsy.xyz%2F&source=homeworld&mission=welcome-to-ao&event=homeworld-entry-001
```

The bridge reads and persists:

- `house` — selected AO house identifier.
- `mount` — selected mount identifier.
- `return` — validated absolute URL for the return action.
- `source` — originating surface, normally `homeworld`.
- `mission` — optional global mission identifier being continued.
- `event` — optional idempotency key for the mission event.

## Static page integration

```html
<script src="/assets/ao-bridge.js"></script>
<script>
  window.addEventListener("ao:bridge-ready", function (event) {
    console.log("AO context", event.detail);
  });
</script>
```

For a subdirectory route in the Homeworld repository, use `../assets/ao-bridge.js`.

## React integration

Copy the bridge into the app's public assets or serve the canonical file from the deployment, then read:

```js
const context = window.AOBridge?.context();
const destination = window.AOBridge?.decorateUrl("/games/", {
  houseAware: true,
  mission: "play-with-purpose",
  eventId: "game-trivia-<score-id>",
});
```

The bridge is intentionally storage-light and backend-neutral. It provides continuity now through URL parameters and local storage. Authenticated server-backed progress can be added later without changing the destination registry contract.
