# ✨ media-transformer ✨

A fast, interactive CLI tool for batch image processing. Resize, convert, and optimize your images with ease, powered by
[Bun](https://bun.sh) and [Sharp](https://sharp.pixelplumbing.com/).

## 🚀 Features

- **Batch Processing:** Process hundreds of images in seconds.
- **Interactive UI:** User-friendly prompts for missing configurations using `@clack/prompts`.
- **Progress Tracking:** Real-time feedback with `spinnies` progress indicators.
- **Smart Resizing:** Automatically fits images while maintaining aspect ratio.
- **Multi-Format Support:** Convert between popular formats (WebP, PNG, JPEG, GIF, etc.).
- **Concurrency Control:** Fine-tune performance with configurable processing limits.
- **Environment Driven:** Fully configurable via `.env` files or CLI flags.

## 📦 Installation

To install dependencies:

```bash
bun install
```

## 🛠️ Usage

You can run the transformer directly using:

```bash
bun run src/index.ts
```

Or via the start script:

```bash
bun start
```

### CLI Options

| Flag       | Shortcut | Description                   | Default             |
| :--------- | :------- | :---------------------------- | :------------------ |
| `--input`  | `-i`     | Input directory path          | `INPUT_FOLDER` env  |
| `--output` | `-o`     | Output directory path         | `OUTPUT_FOLDER` env |
| `--width`  | `-w`     | Target width in pixels        | `WIDTH` env         |
| `--height` | `-h`     | Target height in pixels       | `HEIGHT` env        |
| `--size`   | `-s`     | Sets both width and height    | -                   |
| `--format` | `-f`     | Output format (e.g., `.webp`) | `FORMAT` env        |
| `--limit`  | `-l`     | Max concurrent operations     | `LIMIT` env         |

### 🌍 Environment Variables

Create a `.env` file in the root directory to set your defaults:

```env
WIDTH=800
HEIGHT=600
INPUT_FOLDER='./input'
OUTPUT_FOLDER='./output'
FORMAT='.webp'
LIMIT=10
```

## 🧑‍💻 Development

### Available Scripts

- `bun run dev`: Start the application with hot reloading.
- `bun run start`: Run the production entry point.
- `bun run lint`: Check for code quality issues using `oxlint`.
- `bun run fmt`: Format the codebase using `oxfmt`.
- `bun run prepare`: Setup husky hooks.

## 📄 License

This project is private.
