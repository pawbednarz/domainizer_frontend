import useAxios from "axios-hooks";
import {API_URL} from "../../consts";
import {Link, useParams} from "react-router-dom";
import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader, Table, Tooltip} from "@mantine/core";
import {IconEye, IconLockSquare} from "@tabler/icons-react";

export const VulnScanResultsList = () => {

    const {scanId, runScanId} = useParams()

    const [{data, loading, error}, refetch] = useAxios({
            url: API_URL + "/scan/" + scanId + "/vulnScan/results/" + runScanId,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    return <>
        {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
            <PageWrapper
                title={"Vulnerability scan results of \"" + data.name + "\" (" + data.scannedDomain + ")"}
            >
                <Table striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Open ports</th>
                        <th>Issues identified</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data ? data.results.map(val => {
                        return <>
                            <tr>
                                <td>{data.scannedDomain}</td>
                                <td>{val.openPortsCount}</td>
                                <td>{val.issuesCount}</td>
                                <td>
                                    <Tooltip label="Show open ports" color="gray">
                                        <Link style={{color: "black"}}
                                              to={"/scan/" + scanId + "/resultsVuln/" + runScanId + "/" + val.id + "/openPorts"}>
                                            <IconEye
                                                className="scan-icon"
                                            />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip label="Show security issues" color="gray">
                                        <Link style={{color: "black"}}
                                              to={"/scan/" + scanId + "/resultsVuln/" + runScanId + "/" + val.id + "/securityIssues"}>
                                            <IconLockSquare
                                                className="scan-icon"
                                            />
                                        </Link>
                                    </Tooltip>

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