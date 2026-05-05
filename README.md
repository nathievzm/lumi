# ✨ lumi ✨

A fast, interactive CLI tool for batch image processing. Resize, convert, and optimize your images with ease, powered by
[Bun](https://bun.sh) and [Sharp](https://sharp.pixelplumbing.com/).

## 🚀 Features

- **Batch Processing:** Process hundreds of images in seconds with high concurrency.
- **Interactive UI:** User-friendly prompts for missing configurations using `@clack/prompts`.
- **Progress Tracking:** Real-time feedback with `spinnies` progress indicators.
- **Smart Resizing:** Automatically fits images while maintaining aspect ratio (`contain` fit).
- **Multi-Format Support:** Convert between all formats supported by Sharp (WebP, PNG, JPEG, GIF, AVIF, etc.).
- **Animated Support:** Seamlessly handles animated GIFs and WebP files.
- **Concurrency Control:** Fine-tune performance with configurable processing limits.
- **Environment Driven:** Fully configurable via `.env` files or CLI flags.

## 📦 Installation

You don't even need to install it if you use `bunx`! Run it directly from anywhere in your terminal:

```bash
bunx @nathievzm/lumi
```

Or install it globally:

```bash
bun install -g @nathievzm/lumi
```

## 🛠️ Usage

If installed globally, simply run:

```bash
lumi [options]
```

### Interactive Mode

If you run **lumi** without providing required flags (like input/output folders or dimensions), it will guide you
through the configuration using cute, interactive prompts. You can even choose specific output formats for each unique
extension found!

### CLI Options

You can bypass the prompts by providing the flags directly:

```bash
bunx @nathievzm/lumi -i ./my-vacation-pics -s 1080 -f .webp
```

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

**lumi** also reads from a `.env` file in your current working directory. This is useful for saving your preferred
defaults:

```env
WIDTH = '800'
HEIGHT = '600'
INPUT_FOLDER = './input'
OUTPUT_FOLDER = './output'
FORMAT = '.webp'
LIMIT = '10'
```

---

## 🧑‍💻 Local Development

If you want to contribute or run the project from source:

### Clone the repository

```bash
git clone https://github.com/nathievzm/lumi.git
cd lumi
```

### Install dependencies

```bash
bun install
```

### Available Scripts

- `bun start`: Run the application.
- `bun dev`: Start with hot reloading.
- `bun lint`: Check for code quality issues.
- `bun lint:fix`: Fix linting issues automatically.
- `bun fmt`: Format the codebase.
- `bun fmt:check`: Check for formatting issues.
- `bun prepare`: Setup husky hooks.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
