import { extendTheme } from "@chakra-ui/react";
import { Athiti, Kanit } from "next/font/google";

const kanit = Kanit({
    weight: ["100", "200", "300", "500"],
    subsets: ["thai", "latin"],
});

const athiti = Athiti({
    weight: ["200", "300", "400", "500", "600", "700"],
    subsets: ["thai", "latin"],
});

export const theme = extendTheme({
    colors: {
        brand: {
            500: "#DB5F8E",
        },
    },
    fonts: {
        athiti: athiti.style.fontFamily,
        kanit: kanit.style.fontFamily,
        heading: athiti.style.fontFamily,
        default: athiti.style.fontFamily,
    },
});
