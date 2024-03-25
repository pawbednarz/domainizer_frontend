import {NavigationBar} from "../components/menu/NavigationBar";
import {PageHeader} from "../components/page/PageHeader";
import {AppShell} from "@mantine/core";
import {Outlet} from "react-router-dom";

export const RootRoute = () => {
    return (
        <AppShell
            padding="md"
            fixed={false}
            navbar={<NavigationBar/>}
            header={<PageHeader/>}
        >
            <Outlet/>
        </AppShell>
    )
}