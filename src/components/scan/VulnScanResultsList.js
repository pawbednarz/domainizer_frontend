import useAxios from "axios-hooks";
import {API_URL} from "../../consts";
import {Link, useParams} from "react-router-dom";
import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader, Table, Tooltip} from "@mantine/core";
import {IconEye, IconLockSquare} from "@tabler/icons-react";

export const VulnScanResultsList = (props) => {

    const {scanId, runScanId} = useParams()

    const [{data, loading, error}, refetch] = useAxios({
        url: API_URL + "/scan/" + scanId + "/vulnScan/results/" + runScanId, headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }, useCache: false,
    })

    const countTimeDifference = (startDate, finishDate) => {
        const runningTime = (finishDate - startDate) / 1000
        let hours = Math.round(runningTime / 3600)
        let minutes = Math.round((runningTime - hours * 3600) / 60)
        let seconds = Math.round(runningTime % 60)
        if (hours.toString().length === 1) {
            hours = "0" + hours.toString()
        }
        if (minutes.toString().length === 1) {
            minutes = "0" + minutes.toString()
        }
        if (seconds.toString().length === 1) {
            seconds = "0" + seconds.toString()
        }
        return `${hours}:${minutes}:${seconds}`
    }

    return <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>Begin time</th>
                    <th>Open ports</th>
                    <th>Issues identified</th>
                    <th>Duration (H:M:S)</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {props.data ? props.data.results.map(val => {
                    const runScanStartDate = new Date(Date.parse(val.startDateTime))
                    console.log(runScanStartDate)
                    const runScanFinishDate = new Date(Date.parse(val.finishDateTime))
                    return <>
                        <tr>
                            <td>{val.startDateTime.replace("T", " ").substring(0, 19)}</td>
                            <td>{val.openPortsCount}</td>
                            <td>{val.issuesCount}</td>
                            <td>{countTimeDifference(runScanStartDate, runScanFinishDate)}</td>
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
}