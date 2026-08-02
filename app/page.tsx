import { DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * Static-friendly root redirect for GitHub Pages.
 * Relative URL works with or without basePath (/portfolio_web).
 */
export default function RootPage() {
    const href = `${DEFAULT_LOCALE}/`;

    return (
        <html lang={DEFAULT_LOCALE}>
            <head>
                <meta httpEquiv="refresh" content={`0; url=${href}`} />
                <link rel="canonical" href={href} />
            </head>
            <body>
                <p>
                    <a href={href}>Continue to portfolio</a>
                </p>
            </body>
        </html>
    );
}
