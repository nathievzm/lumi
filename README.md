# ✨ lumi ✨

> [!IMPORTANT] lumi is magically powered by [Bun](https://bun.sh) and [Sharp](https://sharp.pixelplumbing.com/). please
> make sure you have bun installed on your system to enjoy the magic!

A fast, interactive CLI tool for batch image processing. Resize, convert, and optimize your images with ease.

## 🚀 features

- **Batch Processing:** Process hundreds of images in seconds with high concurrency.
- **Interactive UI:** User-friendly prompts for missing configurations using `@clack/prompts`.
- **Recursive Processing:** Optionally find all images in subdirectories using the recursive flag.
- **Progress Tracking:** Real-time feedback with interactive progress indicators.
- **Smart Resizing:** Automatically fits images while maintaining aspect ratio (`contain` fit).
- **Multi-Format Support:** Convert between all formats supported by Sharp (WebP, PNG, JPEG, GIF, AVIF, etc.).
- **Animated Support:** Seamlessly handles animated GIFs and WebP files.
- **Concurrency Control:** Fine-tune performance with configurable processing limits.
- **Environment Driven:** Fully configurable via `.env` files or CLI flags.
- **Update Notifications:** Automatically alerts you when a new version is available.

## 📦 installation

> [!TIP] you don't even need to install it if you use `bunx`! you can run it directly from anywhere in your terminal.

```bash
bunx @nathievzm/lumi
```

Or install it globally:

```bash
bun install -g @nathievzm/lumi
```

## 🛠️ usage

If installed globally, simply run:

```bash
lumi [options]
```

### interactive mode

> [!NOTE] if you run **lumi** without providing required flags (like dimensions or output formats), it will guide you
> through the configuration using cute, interactive prompts!

- **Dimensions:** You can enter a single number for square images (e.g., `1080`) or two numbers for custom dimensions
  (e.g., `1920 1080`).
- **Formats:** Choose specific output formats for each unique extension found in your input!
- **Folders:** By default, **lumi** uses your current directory as the input and creates an `output` folder for the
  results.

### cli options

You can bypass the prompts by providing the flags directly:

```bash
bunx @nathievzm/lumi -i ./my-vacation-pics -s 1080 -f .webp
```

| Flag          | Shortcut | Description                   | Default / Env                |
| ------------- | -------- | ----------------------------- | ---------------------------- |
| `--input`     | `-i`     | Input directory path          | `.` / `INPUT_FOLDER`         |
| `--output`    | `-o`     | Output directory path         | `./output` / `OUTPUT_FOLDER` |
| `--width`     | `-w`     | Target width in pixels        | Prompt / `WIDTH`             |
| `--height`    | `-h`     | Target height in pixels       | Prompt / `HEIGHT`            |
| `--size`      | `-s`     | Sets both width and height    | -                            |
| `--format`    | `-f`     | Output format (e.g., `.webp`) | Prompt / `FORMAT`            |
| `--limit`     | `-l`     | Max concurrent operations     | `10` / `LIMIT`               |
| `--recursive` | `-r`     | Process subdirectories        | `false` / `RECURSIVE`        |

### 🌍 environment variables

**lumi** also reads from a `.env` file in your current working directory. This is useful for saving your preferred
defaults:

```env
WIDTH = '800'
HEIGHT = '600'
INPUT_FOLDER = './input'
OUTPUT_FOLDER = './output'
FORMAT = '.webp'
LIMIT = '10'
RECURSIVE = 'false'
```

## 🧑‍💻 local development

> [!IMPORTANT] we absolutely love community contributions! 💖 please read our [CONTRIBUTING.md](CONTRIBUTING.md) for
> detailed guidelines, and don't forget to review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to keep our space safe
> and welcoming.

If you want to contribute or run the project from source:

### clone the repository

```bash
git clone https://github.com/nathievzm/lumi.git
cd lumi
```

### install dependencies

```bash
bun install
```

### available scripts

- `bun start`: Run the application.
- `bun dev`: Start with hot reloading.
- `bun lint`: Check for code quality issues using `oxlint`.
- `bun lint:fix`: Fix linting issues automatically.
- `bun fmt`: Format the codebase using `oxfmt`.
- `bun fmt:check`: Check for formatting issues.
- `bun changelog`: Update the changelog.
- `bun release`: Release a new version with `bumpp` and update the changelog.
- `bun prepare`: Install git hooks with `lefthook`.

## 📄 license

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
