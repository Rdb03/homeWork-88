import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import theme from "../theme.ts";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {persister, store} from "./app/store.ts";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persister}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
