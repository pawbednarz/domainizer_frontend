import useAxios from "axios-hooks";
import {API_URL} from "../../consts";
import {useParams} from "react-router-dom";
import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader, Table} from "@mantine/core";
import {ExportMenu} from "../menu/ExportMenu";

export const VulnScanResultsSecurityIssuesList = () => {

    const {scanId, runScanId, runVulnScanId} = useParams()

    const [{data, loading, error}, refetch] = useAxios(
        {
            url: API_URL + "/scan/" + scanId + "/vulnScan/results/" + runScanId + "/" + runVulnScanId + "/issues",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    const castSeverityToBgColor = severity => {
        console.log(severity)
        let color = ""
        switch (severity) {
            case "Critical":
                color = "#e81546"
                break;
            case "High":
                color = "#d96a16"
                break;
            case "Medium":
                color = "#eded0e"
                break;
            case "Low":
                color = "#0d6913"
                break;
            case "Informational":
                color = "#126ab3"
                break;
        }
        return color;
    }


    return <>
        {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
            <PageWrapper
                title={"Vulnerability scan results of \"" + data.name + "\" (" + data.scannedDomain + ") - security issues"}
            >
                <ExportMenu/>
                <Table striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Issue</th>
                        <th>Description</th>
                        <th>Severity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data ? data.results.map(val => {
                        return <>
                            <tr>
                                <td>{val.asset}</td>
                                <td>{val.name}</td>
                                <td>{val.description}</td>
                                <td bgcolor={castSeverityToBgColor(val.severity)}>{val.severity.toUpperCase()}</td>
                            </tr>
                        </>
                    }) : <Center><Loader color="indigo" size="xl"/></Center>}
                    </tbody>
                </Table>
            </PageWrapper>
        }
    </>
}