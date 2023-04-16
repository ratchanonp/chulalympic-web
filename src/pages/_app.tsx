import { AppPropsWithLayout } from "@/interfaces/nextjs";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from '@vercel/analytics/react';
import { Provider } from "react-redux";


export default function App({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
                <Analytics />
            </ChakraProvider>
        </Provider>
    );
}
