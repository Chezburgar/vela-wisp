/*
 * Vela WISP server.
 *
 * A tiny WebSocket endpoint that Ultraviolet's epoxy transport tunnels through
 * to reach the wider internet. This is the one piece that can't live on GitHub
 * Pages, so it runs here (Render/Fly/VPS/etc.).
 *
 * Point Vela at it with the wss:// form of this host, e.g.
 *   localStorage.setItem("vela:wisp", "wss://vela-wisp.onrender.com/")
 */
const http = require("node:http");
const wisp = require("wisp-server-node");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Simple health/landing page (also used as Render's health check).
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(
        "Vela WISP server is running.\n\n" +
            "This is a WISP endpoint, not a website. Connect over WebSocket:\n" +
            "  wss://<this-host>/\n"
    );
});

// Every WebSocket upgrade is handed to the WISP router.
server.on("upgrade", (req, socket, head) => {
    wisp.routeRequest(req, socket, head);
});

server.listen(PORT, () => {
    console.log(`[vela-wisp] listening on port ${PORT}`);
});
