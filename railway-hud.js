/**
 * AO UNIVERSE // Railway Live Balance HUD Engine
 * Fetches member Glow Points (GP) and Anom Coins (AC) from Railway PostgreSQL backend
 */

// Replace with your active Railway service domain
const RAILWAY_API_URL = "https://your-railway-app.up.railway.app";

async function fetchSanctuaryBalances(memberId = "guest") {
  try {
    const response = await fetch(`${RAILWAY_API_URL}/api/sanctuary/balance?member=${memberId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error("Railway API Offline");

    const data = await response.json();
    updateHudDisplay(data.glowPoints || 0, data.anomCoins || 0);
  } catch (error) {
    console.warn("AO HUD: Running in offline fallback mode.", error);
    updateHudDisplay("--", "--");
  }
}

function updateHudDisplay(gp, ac) {
  const gpElement = document.getElementById("hud-gp-val");
  const acElement = document.getElementById("hud-ac-val");

  if (gpElement) gpElement.textContent = `${gp} GP`;
  if (acElement) acElement.textContent = `${ac} AC`;
}

// Auto-run on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchSanctuaryBalances();
});

Step 3: Update the Glass Navigation HUD in HTML
Replace the <nav class="nav-hud"> block in index.html, sanctuary.html, and arcade.html with this updated HUD that includes live balance counters:

<!-- CROSS-DOMAIN NAVIGATION HUD WITH LIVE RAILWAY BALANCES -->
<nav class="nav-hud">
  <a href="index.html" class="brand-title">AO UNIVERSE</a>
  
  <!-- Live Sanctuary Wallet Counters -->
  <div style="display: flex; gap: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
    <span style="color: var(--ao-cyan); border: 1px solid var(--ao-cyan); padding: 0.2rem 0.6rem; border-radius: 12px;">
      ✨ <span id="hud-gp-val">-- GP</span>
    </span>
    <span style="color: var(--ao-gold); border: 1px solid var(--ao-gold); padding: 0.2rem 0.6rem; border-radius: 12px;">
      🪙 <span id="hud-ac-val">-- AC</span>
    </span>
  </div>

  <div class="hud-links">
    <a href="index.html" class="hud-link">HOMEWORLD</a>
    <a href="sanctuary.html" class="hud-link">SANCTUARY</a>
    <a href="transmissions.html" class="hud-link">TRANSMISSIONS</a>
  </div>
</nav>

<!-- Include the Railway Script before closing body tag -->
<script src="railway-hud.js"></script>
