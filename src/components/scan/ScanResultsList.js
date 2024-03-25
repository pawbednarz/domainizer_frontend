import useAxios from "axios-hooks";
import {API_URL} from "../../consts";
import {useParams} from "react-router-dom";
import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader, Table} from "@mantine/core";
import {ExportMenu} from "../menu/ExportMenu";

export const ScanResultsList = () => {

    const {id, scanId} = useParams()
    const EXPORT_URL = "/export/domain/" + scanId

    const [{data, loading, error}, refetch] = useAxios({
            url: API_URL + "/scan/" + id + "/domainScan/results/" + scanId,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    return <>
        {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
            <PageWrapper
                title={"Scan results of \"" + data.name + "\" (" + data.scannedDomain + ")"}
            >
                <ExportMenu exportUrl={EXPORT_URL}/>
                <Table striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>Domain</th>
                        <th>IP address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data ? data.results.map(val => {
                        return <>
                            <tr>
                                <td>{val.name}</td>
                                <td>{val.ipAddress}</td>
                            </tr>
                        </>
                    }) : <Center><Loader color="indigo" size="xl"/></Center>}
                    </tbody>
                </Table>
            </PageWrapper>
        }
    </>
}