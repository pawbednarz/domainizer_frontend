import {Table, Tooltip} from "@mantine/core";
import {IconEye, IconFileSettings, IconPlayerPlay, IconTrash, IconFileInfo } from "@tabler/icons-react";
import {modals} from "@mantine/modals";
import axios from "axios";
import {API_URL} from "../../consts";
import {errorToast, successToast} from "../../helper";
import {Link} from "react-router-dom";

export const ScanListTable = (props) => {

    const runScan = (scan) => {
        axios.post(
            API_URL + "/scan/run",
            {"scanId": scan.id},
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(res => successToast("Scan is running"))
            .catch(err => errorToast("Something went wrong."))
    }

    const showScanConfiguration = (scan) => {
        modals.open({
            title: 'Configuration of ' + scan.name + " (" + scan.scannedDomain + ")",
            centered: true,
            children: (
                <p style={{whiteSpace: "pre"}}>
                    {JSON.stringify(scan, null, 4)}
                </p>
            ),
        });
    }

    const showWhoisInformation = (scan) => {
        // make request
        axios.get(
            API_URL + "/statistics/getWhoisInfo/" + scan.id,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(res => {
            let obj = JSON.parse(res.data.whois)
            let test = obj.name_servers.replaceAll("\r", "").replaceAll("\n", "").split(" ")
            test = test.filter(n => n !== "")
            obj.name_servers = test
            modals.open({
                title: 'Whois information of ' + scan.scannedDomain,
                centered: true,
                children: (
                    <p style={{whiteSpace: "pre"}}>
                        {JSON.stringify(obj, null, 4)}
                    </p>
                ),
            });
        }).catch(err => errorToast("Something went wrong."))
    }

    const deleteScan = (scan) => {
        axios.delete(
            API_URL + "/scan/delete",
            {
                data: {
                    "scanId": scan.id
                },
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(res => {
            successToast("Scan deleted successfully")
            props.refetch()
        })
            .catch(err => errorToast("Something went wrong."))
    }

    return (
        <Table striped highlightOnHover>
            <thead>
            <tr>
                <th>Scan name</th>
                <th>Target Domain</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {props.data ? props.data.map(val => {
                return <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>{val.scannedDomain}</td>
                    <td>
                        {/*TODO implement is running feature (look at frontend-react project)*/}
                        <Tooltip label="Run scan" color="gray">
                            <IconPlayerPlay
                                className="scan-icon"
                                onClick={() => runScan(val)}
                            />
                        </Tooltip>
                        <Tooltip label="Show scan results" color="gray">
                            <Link style={{color: "black"}} to={"/scan/" + val.id + "/results"}>
                                <IconEye
                                    className="scan-icon"
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip label="Show scan configuration" color="gray">
                            <IconFileSettings
                                className="scan-icon"
                                onClick={() => showScanConfiguration(val)}
                            />
                        </Tooltip>
                        <Tooltip label="Show whois information" color="gray">
                            <IconFileInfo
                                className="scan-icon"
                                onClick={() => showWhoisInformation(val)}
                            />
                        </Tooltip>
                        <Tooltip label="Delete scan" color="gray">
                            <IconTrash
                                className="scan-icon"
                                onClick={() => deleteScan(val)}
                            />
                        </Tooltip>
                    </td>
                </tr>
            }) : ""}
            </tbody>
        </Table>
    )
}