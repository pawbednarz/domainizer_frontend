import {useForm} from "@mantine/form";
import {Box, Button, Center, Group, Loader, TextInput} from "@mantine/core";
import {PageWrapper} from "./page/PageWrapper";
import axios from "axios";
import {API_URL} from "../consts";
import {errorToast, successToast} from "../helper";
import useAxios from "axios-hooks";
import {useEffect} from "react";

export const Configuration = () => {

    const [{data, loading, error}, refetch] = useAxios({
            url: API_URL + "/config",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    const form = useForm({
        initialValues: {
            virusTotalKey: "",
            censysApiId: "",
            censysApiSecret: "",
            shodanApiSecret: ""
        },
        validate: {}
    })

    useEffect(() => {
        if (!loading) {
            form.setFieldValue("virusTotalKey", data.virusTotalKey)
            form.setFieldValue("censysApiId", data.censysApiId)
            form.setFieldValue("censysApiSecret", data.censysApiSecret)
            form.setFieldValue("shodanApiSecret", data.shodanApiSecret)
        }
    }, data)

    const submitForm = () => {
        // TODO add check if scan exist - if yes ask if we should create a new one
        axios.post(
            API_URL + "/config",
            form.values,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(() => {
            successToast("Configuration updated successfully.")
        })
            .catch(err => {
                errorToast("Something went wrong.")
                console.log(err)
            })
    }

    return (
        <PageWrapper title="Configuration">
            <Box maw={600} mx="left" mt={16}>
                {data ?
                    <form>
                        <TextInput
                            label="Virus Total API key"
                            {...form.getInputProps('virusTotalKey')}
                        />
                        <TextInput
                            label="Censys API ID"
                            {...form.getInputProps('censysApiId')}
                        />
                        <TextInput
                            label="Censys API secret"
                            {...form.getInputProps('censysApiSecret')}
                        />
                        <TextInput
                            label="Shodan API key"
                            {...form.getInputProps('shodanApiSecret')}
                        />
                        <Group position="left" mt="md">
                            <Button onClick={submitForm} color="green">Submit</Button>
                        </Group>
                    </form>
                    : <Center><Loader color="indigo" size="xl"/></Center>}
            </Box>
        </PageWrapper>
    );
}