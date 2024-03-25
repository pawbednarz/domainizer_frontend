import {PageWrapper} from "../page/PageWrapper";
import {Link, useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {API_URL} from "../../consts";
import {Center, Loader, Table, Tooltip} from "@mantine/core";
import {IconChartLine, IconEye, IconScan} from "@tabler/icons-react";
import axios from "axios";
import {errorToast, successToast} from "../../helper";

export const ScanResults = () => {

    const {id} = useParams()

    const [{data, loading, error}, refetch] = useAxios({
            url: API_URL + "/scan/" + id + "/domainScan/results",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

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

    const runVulnerabilityScan = (id, runScan) => {
        axios.post(
            API_URL + "/scan/" + id + "/vulnScan/run",
            {
                "scanId": id,
                "runScanId": runScan.id.toString()
            },
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(res => successToast("Scan is running"))
            .catch(err => errorToast("Something went wrong."))
    }

    return (
        <>
            {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
                <PageWrapper title={"Scan results of \"" + data.name + "\" (" + data.scannedDomain + ")"}>
                    <Table striped highlightOnHover>
                        <thead>
                        <tr>
                            <th>Begin time</th>
                            <th>Domain records count</th>
                            <th>IP address count</th>
                            <th>Duration (H:M:S) (domain)</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.scanResults ? data.scanResults.map(val => {
                            const runScanStartDate = new Date(Date.parse(val.startDateTime))
                            const runScanFinishDate = new Date(Date.parse(val.finishDateTime))
                            return <tr key={val.id}>
                                <td>{val.startDateTime.replace("T", " ").substring(0, 19)}</td>
                                <td>{val.resultsCount}</td>
                                <td>{val.ipAddressCount}</td>
                                <td>{countTimeDifference(runScanStartDate, runScanFinishDate)}</td>
                                <td>
                                    <Tooltip label="Show scan results" color="gray">
                                        <Link style={{color: "black"}} to={"/scan/" + id + "/results/" + val.id}>
                                            <IconEye
                                                className="scan-icon"
                                            />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip label="Run vulnerability scan" color="gray">
                                        <IconScan
                                            className="scan-icon"
                                            onClick={() => runVulnerabilityScan(id, val)}
                                        />
                                    </Tooltip>
                                    <Tooltip label="Show vulnerability scan results" color="gray">
                                        <Link style={{color: "black"}} to={"/scan/" + id + "/resultsVuln/" + val.id}>
                                            <IconChartLine
                                                className="scan-icon"
                                            />
                                        </Link>
                                    </Tooltip>
                                </td>
                            </tr>
                        }) : ""}
                        </tbody>
                    </Table>
                </PageWrapper>
            }
        </>
    )
}