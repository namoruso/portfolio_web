/**
 * Prefix public asset paths with the deploy basePath (e.g. /portfolio_web on GitHub Pages).
 * next/image does not always apply basePath correctly with `output: 'export'`.
 */
export function assetPath(path: string): string {
    if (!path.startsWith("/") || path.startsWith("//")) {
        return path;
    }

    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    if (!base) {
        return path;
    }

    return `${base}${path}`;
}
