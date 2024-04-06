import {PageWrapper} from "./page/PageWrapper";
import {Center, Divider, Grid, Loader, Paper, SimpleGrid, Text, Title} from "@mantine/core"
import useAxios from "axios-hooks";
import axios from "axios";
import {API_URL} from "../consts";
import {ScanListTable} from "./scan/ScanListTable";
import {useCallback, useEffect, useState} from "react";

export const Dashboard = () => {

    const axiosInstance = useAxios()
    const [scanData, setScanData] = useState({})
    const [vulnData, setVulnData] = useState({})
    const [configData, setConfigData] = useState({})
    const [recentFinishedScansData, setRecentFinishedScansData] = useState({})

    const [{data, scanLoading, scanError}, scanRefetch] = useAxios({
            url: API_URL + "/scan?records=5",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    const loadVulnData = useCallback(async () => {
        try {
            const response = await axios.get(API_URL + "/statistics/vulnerabilities", {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                useCache: false,
            })
            setVulnData(response.data)
        } catch (error) {
            console.log("Error when loading vulnerabilities statistics.", error)
        }
    })

    const loadConfigData = useCallback(async () => {
        try {
            const response = await axios.get(API_URL + "/statistics/configuration", {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                useCache: false,
            })
            setConfigData(response.data)
        } catch (error) {
            console.log("Error when loading vulnerabilities statistics.", error)
        }
    })

    const loadRecentFinishedScansData = useCallback(async () => {
        try {
            const response = await axios.get(API_URL + "/statistics/recentFinishedScans", {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                useCache: false,
            })
            setRecentFinishedScansData(response.data)
        } catch (error) {
            console.log("Error when loading vulnerabilities statistics.", error)
        }
    })

    useEffect(() => {
        axiosInstance && loadVulnData()
        axiosInstance && loadConfigData()
        axiosInstance && loadRecentFinishedScansData()
        console.log("my vulndata" + Object.values(recentFinishedScansData))
    }, configData)

    const castSeverityToBgColor = severity => {
        let color = ""
        switch (severity) {
            case "critical":
                color = "#e81546"
                break;
            case "high":
                color = "#d96a16"
                break;
            case "medium":
                color = "#eded0e"
                break;
            case "low":
                color = "#0d6913"
                break;
            case "informational":
                color = "#126ab3"
                break;
        }
        return color;
    }

    return (
        <PageWrapper title="Dashboard">
            <Grid>
                <Grid.Col span={12}>
                    <Paper shadow="xl" radius="md" withBorder p="xl">
                        <Title order={3}>Recent scans</Title>
                        <Divider mt={5} mb={10}/>
                        {scanLoading ? <Center><Loader color="indigo" size="xl"/></Center> :
                            <ScanListTable data={data} refetch={scanRefetch}/>}
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="xl" radius="md" withBorder p="xl">
                        <Title order={3}>Vulnerability statistics</Title>
                        <Divider mt={5} mb={10}/>
                        <SimpleGrid cols={5}>
                            <Center><Text fz="xl"
                                          color={castSeverityToBgColor("critical")}><strong>CRITICAL</strong></Text></Center>
                            <Center><Text fz="xl"
                                          color={castSeverityToBgColor("high")}><strong>HIGH</strong></Text></Center>
                            <Center><Text fz="xl" color={castSeverityToBgColor("medium")}><strong>MEDIUM</strong></Text></Center>
                            <Center><Text fz="xl"
                                          color={castSeverityToBgColor("low")}><strong>LOW</strong></Text></Center>
                            <Center><Text fz="xl"
                                          color={castSeverityToBgColor("informational")}><strong>INFO</strong></Text></Center>
                            <Center><Text fz="xl"><strong>{vulnData.critical}</strong></Text></Center>
                            <Center><Text fz="xl"><strong>{vulnData.high}</strong></Text></Center>
                            <Center><Text fz="xl"><strong>{vulnData.medium}</strong></Text></Center>
                            <Center><Text fz="xl"><strong>{vulnData.low}</strong></Text></Center>
                            <Center><Text fz="xl"><strong>{vulnData.informational}</strong></Text></Center>
                        </SimpleGrid>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="xl" radius="md" withBorder p="xl">
                        <Title order={3}>External services configuration state</Title>
                        <Divider mt={5} mb={10}/>
                        <Grid>
                            <Grid.Col span={6}><Text fz="xl"><strong>Service</strong></Text></Grid.Col>
                            <Grid.Col span={6}><Text fz="xl"><strong>State</strong></Text></Grid.Col>
                            <Grid.Col span={6}><Text fz="lg">Virus Total:</Text></Grid.Col>
                            <Grid.Col span={6}>
                                {
                                    configData.virusTotal ?
                                        <Text fz="lg" color="#0d6913"><strong>CONFIGURED</strong></Text> :
                                        <Text fz="lg" color="#e81546"><strong>NOT CONFIGURED</strong></Text>
                                }
                            </Grid.Col>
                            <Grid.Col span={6}><Text fz="lg">Censys:</Text></Grid.Col>
                            <Grid.Col span={6}>
                                {
                                    configData.censys ?
                                        <Text fz="lg" color="#0d6913"><strong>CONFIGURED</strong></Text> :
                                        <Text fz="lg" color="#e81546"><strong>NOT CONFIGURED</strong></Text>
                                }
                            </Grid.Col>
                            <Grid.Col span={6}><Text fz="lg">Shodan:</Text></Grid.Col>
                            <Grid.Col span={6}>
                                {
                                    configData.shodan ?
                                        <Text fz="lg" color="#0d6913"><strong>CONFIGURED</strong></Text> :
                                        <Text fz="lg" color="#e81546"><strong>NOT CONFIGURED</strong></Text>
                                }
                            </Grid.Col>
                            <Grid.Col span={6}><Text fz="lg">API Ninjas:</Text></Grid.Col>
                            <Grid.Col span={6}>
                                {
                                    configData.apiNinjas ?
                                        <Text fz="lg" color="#0d6913"><strong>CONFIGURED</strong></Text> :
                                        <Text fz="lg" color="#e81546"><strong>NOT CONFIGURED</strong></Text>
                                }
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Grid.Col>
            </Grid>
        </PageWrapper>
    )
}