#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --allow-env

/**
 * AI generated
 * Claud Opus 4
 * Anthropic
 *
 * File watcher that automatically runs `deno fmt` on file changes
 * Usage: deno run --allow-read --allow-write --allow-run --allow-env fmt.ts
 */

import { debounce } from "jsr:@std/async/debounce";
import { walk } from "jsr:@std/fs/walk";
import { relative, resolve } from "jsr:@std/path";

// Configuration
const config = {
    // Directories to watch (default: current directory)
    watchDirs: ["src"],

    // File extensions to watch
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs", ".json", ".md"],

    // Directories to ignore
    ignoreDirs: ["node_modules", ".git", "dist", "build", "coverage", ".cache"],

    // Debounce delay in milliseconds
    debounceDelay: 500,
};

// ANSI color codes
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    gray: "\x1b[90m",
};

// Format a file path for display
function formatPath(path: string): string {
    return relative(Deno.cwd(), path);
}

// Check if a path should be ignored
function shouldIgnore(path: string): boolean {
    const parts = path.split("/");
    return parts.some(part => config.ignoreDirs.includes(part));
}

// Check if a file should be watched
function shouldWatch(path: string): boolean {
    if (shouldIgnore(path)) return false;
    return config.extensions.some(ext => path.endsWith(ext));
}

// Run deno fmt on a file
async function formatFile(path: string) {
    const displayPath = formatPath(path);
    console.log(`${colors.blue}Formatting${colors.reset} ${displayPath}...`);

    try {
        const command = new Deno.Command("deno", {
            args: ["fmt", path],
            stdout: "piped",
            stderr: "piped",
        });

        const { code, stderr } = await command.output();

        if (code === 0) {
            console.log(`${colors.green}✓${colors.reset} Formatted ${displayPath}`);
        } else {
            console.error(`${colors.red}✗${colors.reset} Failed to format ${displayPath}`);
            const errorText = new TextDecoder().decode(stderr);
            if (errorText) {
                console.error(`${colors.red}${errorText}${colors.reset}`);
            }
        }
    } catch (error) {
        console.error(`${colors.red}✗${colors.reset} Error formatting ${displayPath}:`,
            error instanceof Error ? error.message : String(error));
    }
}

// Get all files to watch
async function getWatchFiles(): Promise<Set<string>> {
    const files = new Set<string>();

    for (const dir of config.watchDirs) {
        try {
            for await (const entry of walk(dir, { includeFiles: true, includeDirs: false })) {
                if (shouldWatch(entry.path)) {
                    files.add(resolve(entry.path));
                }
            }
        } catch (error) {
            console.error(`${colors.red}Error walking directory ${dir}:${colors.reset}`,
                error instanceof Error ? error.message : String(error));
        }
    }

    return files;
}

// Main watcher function
async function watch() {
    console.log(`${colors.blue}🔍 Deno Format Watcher${colors.reset}`);
    console.log(`${colors.gray}Watching for changes in: ${config.watchDirs.join(", ")}${colors.reset}`);
    console.log(`${colors.gray}Extensions: ${config.extensions.join(", ")}${colors.reset}`);
    console.log(`${colors.gray}Press Ctrl+C to stop${colors.reset}\n`);

    // Create debounced format function
    const debouncedFormat = debounce(formatFile, config.debounceDelay);

    // Get initial list of files
    const watchFiles = await getWatchFiles();
    console.log(`${colors.green}Watching ${watchFiles.size} files${colors.reset}\n`);

    // Create watcher
    const watcher = Deno.watchFs([...config.watchDirs]);

    // Handle file changes
    for await (const event of watcher) {
        for (const path of event.paths) {
            const absPath = resolve(path);

            // Handle different event types
            switch (event.kind) {
                case "create":
                case "modify":
                    if (shouldWatch(absPath)) {
                        watchFiles.add(absPath);
                        debouncedFormat(absPath);
                    }
                    break;

                case "remove":
                    if (watchFiles.has(absPath)) {
                        watchFiles.delete(absPath);
                        console.log(`${colors.yellow}File removed:${colors.reset} ${formatPath(absPath)}`);
                    }
                    break;
            }
        }
    }
}

// Handle graceful shutdown
let isShuttingDown = false;

function shutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`\n${colors.yellow}Shutting down watcher...${colors.reset}`);
    Deno.exit(0);
}

// Register signal handlers
if (Deno.build.os !== "windows") {
    Deno.addSignalListener("SIGINT", shutdown);
    Deno.addSignalListener("SIGTERM", shutdown);
} else {
    // Windows doesn't support signal listeners well, so we rely on Ctrl+C
    globalThis.addEventListener("unload", shutdown);
}

// Run the watcher
if (import.meta.main) {
    try {
        await watch();
    } catch (error) {
        console.error(`${colors.red}Fatal error:${colors.reset}`,
            error instanceof Error ? error.message : String(error));
        Deno.exit(1);
    }
}
