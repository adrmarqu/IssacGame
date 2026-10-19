# The Binding of Isaac - Web Edition

A 2D top-down dungeon crawler game inspired by *The Binding of Isaac*, built using **Phaser 3** and JavaScript (ES6 Modules).

---

## 🎮 How to Play

### Controls
| Key | Action |
| :--- | :--- |
| **`W` / `A` / `S` / `D`** | Move Isaac (Up / Left / Down / Right) |
| **`Spacebar`** | Shoot tears |
| **`Q` / `E`** | Place a bomb |

### Objective
1. **Clear the Room:** Defeat all the flies in the basement room using tears or bombs.
2. **Collect the Key:** When all flies are defeated, the golden key will drop. Walk over it to pick it up.
3. **Unlock the Door:** Approach the locked wooden door at the top of the room. Using the key will unlock it and open the passageway.
4. **Defeat the Boss:** Enter the open door to face **Duke of Flies**. Dodge his tear attacks and defeat him to achieve victory!
5. **Survival:** Keep an eye on your health. If your health reaches 0, it's Game Over and the room will reset.

---

## 🚀 Running Locally

Because the project uses modern ES6 JavaScript modules and asset loading via HTTP, it must be served through a local web server (opening `index.html` directly via `file://` will be blocked by browser CORS security policies).

### Option 1: Python (Recommended)
From the project root directory, run:
```bash
python3 -m http.server 8000
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

### Option 2: VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click [`index.html`](file:///Users/adria/Desktop/42Barcelona/isaac/index.html) and select **Open with Live Server**.

### Option 3: Node.js / npx
```bash
npx serve
```

---

## 📦 Project Structure

```
├── assets/
│   ├── animations/     # Character sprite sheets
│   ├── sprites/        # Flies, tears, bombs, keys, and doors
│   └── tilemap/        # Tiled map JSON export
├── js/
│   ├── boss.js         # Boss logic (Duke of Flies, attacks, minions, health bar)
│   ├── fly.js          # Enemy logic (movement, animations, key drop)
│   ├── game.js         # Main scene coordinator (collisions, transitions)
│   ├── keys.js         # Input bindings (keyboard handlers)
│   ├── main.js         # Phaser game configuration and bootstrap
│   ├── map.js          # Tilemap loading and layer rendering
│   └── player.js       # Player controls, animations, health HUD, and bombs
├── maps/               # Original Tiled (.tmx) map source file
├── tileset/            # Environment tileset textures
├── index.html          # HTML5 canvas entrypoint
└── README.md           # Documentation
```

---

## 🛠️ Built With
* [Phaser 3](https://phaser.io/) (v3.55.2) - 2D Game Framework
* [Tiled Map Editor](https://www.mapeditor.org/) - Level and room design
* Vanilla JavaScript (ES6 Modules)
