import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader} from "@mantine/core";
import useAxios from "axios-hooks";
import {VulnScanResultsList} from "./VulnScanResultsList";
import {API_URL} from "../../consts";
import {useParams} from "react-router-dom";

export const VulnScans = () => {

    const {scanId, runScanId} = useParams()

    const [{data, loading, error}, refetch] = useAxios({
        url: API_URL + "/scan/" + scanId + "/vulnScan/results/" + runScanId, headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }, useCache: false,
    })

    return (
        <>
        {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
        <PageWrapper title={"Vulnerability scan results of \"" + data.name + "\" (" + data.scannedDomain + ")"}>
                <VulnScanResultsList data={data} refetch={refetch}/>
        </PageWrapper>}
        </>
    )
}