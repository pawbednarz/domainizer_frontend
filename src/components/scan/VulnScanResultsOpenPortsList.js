import useAxios from "axios-hooks";
import {API_URL} from "../../consts";
import {useParams} from "react-router-dom";
import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader, Table, Text} from "@mantine/core";

export const VulnScanResultsOpenPortsList = () => {

    const {scanId, runScanId, runVulnScanId} = useParams()

    const [{data, loading, error}, refetch] = useAxios(
        {
            url: API_URL + "/scan/" + scanId + "/vulnScan/results/" + runScanId + "/" + runVulnScanId,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )


    return <>
        {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
            <PageWrapper
                title={"Vulnerability scan results of \"" + data.name + "\" (" + data.scannedDomain + ") - open ports"}
            >
                <Table striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>Ip address</th>
                        <th>Domains</th>
                        <th>Open ports</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data ? data.results.map(val => {
                        return <>
                            <tr>
                                <td>{val.ipAddress}</td>
                                <td>
                                    {val.domainNames.map(domainName => <Text>{domainName}</Text>)}
                                </td>
                                <td>{val.openPort[0] ?
                                    val.openPort.map(port =>
                                        <Text>{port.openPort} {port.service ? <>({port.service})</> : <></>}</Text>) :
                                    <Text>No open ports identified</Text>}
                                </td>
                            </tr>
                        </>
                    }) : <Center><Loader color="indigo" size="xl"/></Center>}
                    </tbody>
                </Table>
            </PageWrapper>
        }
    </>
}