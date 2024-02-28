import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import theme from "../theme.ts";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {store} from "./app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
)
