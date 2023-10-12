import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/themes/tailwind-light/fonts/Inter-SemiBold.woff2';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import {Provider} from "react-redux";
import {store} from "./app/store";
import React from "react";
import {FilterMatchMode, PrimeReactProvider} from "primereact/api";


function App() {
    const value = {
        ripple: true,
        hideOverlayOnScroll: true,
        filterMatchMode: {
            text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
            numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
            date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
        },
    };
    return (
        <PrimeReactProvider value={value}>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </Provider>
        </PrimeReactProvider>
    )
}

export default App;
