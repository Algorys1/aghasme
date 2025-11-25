# Theme and Atmosphere

## Themes

The game will use two different themes:

1. Dark theme

Dark theme have a black background with a few gold runes (file `assets/ui/dark_background.webp`)

    This theme will primarily be used for the game menus, the home screen, settings, and game creation screen.

    It is also used for the in-game map background and the backgrounds of overlays and combat screens.

2. A light theme

Light theme have a parchment background (file `assets/ui/parchment_background.webp`)

    This is used mainly in-game, on the main interface and other game interfaces such as equipment, inventory, overlay text, etc.

## Text and Fonts

Game will use the font Spectral everywhere.

A special color will be used for game menus:

    ```scss
    .blue-aghasme {
      font-family: "Spectral" !important;
      color: #7dacbb !important;
    }
    ```

In game, most of the button will have the following style :

    ```scss
    .hud-button {
      width: 44px;
      height: 44px;

      background: linear-gradient(to bottom, #fdf3d3 0%, #e5c88b 100%);
      border-radius: 10px;
      border: 2px solid #2b1b0f;
      box-shadow:
        0 3px 4px rgba(0,0,0,0.45),
        inset 0 1px 0 rgba(255,255,255,0.7);

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      padding: 0;
    }
    ```
