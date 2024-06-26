import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    <title>Toodle Mail App</title>
                </Head>
                <body style={{ overflow: "hidden" }}>
                    {/* Make Color mode to persists when you refresh the page. */}
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
