import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./components/Login";
import {NewScan} from "./components/scan/NewScan";
import {Scans} from "./components/scan/Scans";
import {PrivateRoute} from "./components/menu/PrivateRoute"
import {Configuration} from "./components/Configuration";
import {ErrorPage} from "./routes/ErrorPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ModalsProvider} from "@mantine/modals";
import {Dashboard} from "./components/Dashboard";
import {ScanResults} from "./components/scan/ScanResults";
import {ScanResultsList} from "./components/scan/ScanResultsList";
import {VulnScans} from "./components/scan/VulnScans";
import {VulnScanResultsOpenPortsList} from "./components/scan/VulnScanResultsOpenPortsList";
import {VulnScanResultsSecurityIssuesList} from "./components/scan/VulnScanResultsSecurityIssuesList";
import {UserManagement} from "./components/administration/UserManagement";

function App() {

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/",
            element: <PrivateRoute/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard/>
                },
                {
                    path: "/newScan",
                    element: <NewScan/>
                },
                {
                    path: "/scans",
                    element: <Scans/>
                },
                {
                    path: "/config",
                    element: <Configuration/>
                },
                {
                    path: "/scan/:id/results",
                    element: <ScanResults/>,
                },
                {
                    path: "/scan/:id/results/:scanId",
                    element: <ScanResultsList/>
                },
                {
                    path: "/scan/:scanId/resultsVuln/:runScanId/",
                    element: <VulnScans/>
                },
                {
                    path: "/scan/:scanId/resultsVuln/:runScanId/:runVulnScanId/openPorts",
                    element: <VulnScanResultsOpenPortsList/>
                },
                {
                    path: "/scan/:scanId/resultsVuln/:runScanId/:runVulnScanId/securityIssues",
                    element: <VulnScanResultsSecurityIssuesList/>
                },
                {
                    path: "/administration",
                    element: <UserManagement/>
                }
            ]
        },
    ]);

    return (
        <>
            <ModalsProvider>
                <RouterProvider router={router}/>
                <ToastContainer/>
            </ModalsProvider>
        </>
    );
}

export default App;
