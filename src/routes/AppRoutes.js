import {Route, Routes} from "react-router-dom";
import {ROUT_DATA} from "./routeData";

function AppRoutes() {

    return (
        <Routes>
            {
                ROUT_DATA.map((route, index) => {
                    const Layout = route.layout
                    const Page = route.element
                    return <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page/>
                            </Layout>}/>
                })
            }

        </Routes>
    )
}

export default AppRoutes