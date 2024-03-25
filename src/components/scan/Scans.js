import {PageWrapper} from "../page/PageWrapper";
import {Center, Loader} from "@mantine/core";
import useAxios from "axios-hooks";
import {ScanListTable} from "./ScanListTable";
import {API_URL} from "../../consts";

export const Scans = () => {

    const [{data, loading, error}, refetch] = useAxios({
            url: API_URL + "/scan",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    return (
        <PageWrapper title="Scans">
            {loading ? <Center><Loader color="indigo" size="xl"/></Center> :
                <ScanListTable data={data} refetch={refetch}/>}
        </PageWrapper>
    )
}