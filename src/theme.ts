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

const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "67em",
    xl: "80em",
}

export const theme = extendTheme({
    colors: {
        brand: {
            500: "#DB5F8E",
        },
        bronze: "#CD7F32",
    },
    fonts: {
        athiti: athiti.style.fontFamily,
        kanit: kanit.style.fontFamily,
        heading: athiti.style.fontFamily,
        default: athiti.style.fontFamily,
    },
    breakpoints
});
