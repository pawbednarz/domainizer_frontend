import {PageWrapper} from "../page/PageWrapper";
import {useForm} from "@mantine/form";
import {Box, Button, Checkbox, Divider, FileInput, Group, Tabs, TextInput} from "@mantine/core";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../consts";
import {errorToast, successToast} from "../../helper";

// TODO fix brute force and dictionary - when they are unchecked - set objects to null so scans are not triggered
export const NewScan = () => {

    const [doDictionary, setDoDictionary] = useState(true)

    const form = useForm({
        initialValues: {
            name: "",
            scannedDomain: "",
            domainScanConfig: {
                zoneTransfer: true,
                searchEngines: true,
                httpHeaders: true,
                dnsRecords: true,
                dnsAggregators: true,
                certificateTransparency: true,
                subjectAlternateName: true,
                dictionaryConfig: {
                    dictionaryFile: null
                }
            },
            vulnScanConfig: {
                scannedPorts: "22,80,443",
                unencryptedCommunication: true,
                weakSshCredentials: true,
                securityHeaders: true,
                sslIssues: true
            }
        },
        // TODO add validation
        validate: {}
    });

    // file input has to be handled separately due to problems in Mantine not updating form object with file content
    const handleFileChange = async (e) => {
        const t = await e.text()
        form.setFieldValue("domainScanConfig.dictionaryConfig.dictionaryFile", t)
    };

    const submitForm = () => {
        // TODO add check if scan exist - if yes ask if we should create a new one
        axios.post(
            API_URL + "/scan/addScan",
            form.values,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(() => {
            successToast("Scan added successfully.")
        })
            .catch(err => {
                errorToast("Something went wrong.")
                console.log(err)
            })
    }

    return (
        <PageWrapper title="New Scan">
            <Tabs defaultValue="passiveScan">
                <Tabs.List>
                    <Tabs.Tab value="passiveScan">Passive scan configuration</Tabs.Tab>
                    <Tabs.Tab value="activeScan">Active scan configuration</Tabs.Tab>
                    <Tabs.Tab value="vulnScan">Vulnerability scan configuration</Tabs.Tab>
                </Tabs.List>
                <Box maw={700}>
                    <TextInput
                        label="Scan name"
                        placeholder="e.g. Test scan"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label="Domain to scan"
                        placeholder="e.g. example.com"
                        {...form.getInputProps('scannedDomain')}
                    />
                </Box>
                <Tabs.Panel value="passiveScan">
                    <p>Passive scan configuration options:</p>
                    <Box maw={600} mx="left" mt={16}>
                        <form>
                            <Checkbox
                                label="Search through Certificate Transparency logs"
                                {...form.getInputProps('domainScanConfig.certificateTransparency', {type: 'checkbox'})}
                            />
                            <Checkbox
                                mt={10}
                                label="Use search engines"
                                {...form.getInputProps('domainScanConfig.searchEngines', {type: 'checkbox'})}
                            />
                            <Checkbox
                                mt={10}
                                label="Use DNS aggregators (API)"
                                {...form.getInputProps('domainScanConfig.dnsAggregators', {type: 'checkbox'})}
                            />
                            <Checkbox
                                mt={10}
                                label="Check certificate Subject Alternate Name field"
                                {...form.getInputProps('domainScanConfig.subjectAlternateName', {type: 'checkbox'})}
                            />
                        </form>
                    </Box>
                    <Divider mt={10}/>
                </Tabs.Panel>
                <Tabs.Panel value="activeScan">
                    <p>Active scan configuration options:</p>
                    <h3>Dictionary enumeration</h3>
                    <Checkbox
                        mt={10}
                        label="Perform dictionary attack"
                        checked={doDictionary}
                        onChange={() => setDoDictionary(!doDictionary)}
                    />
                    <FileInput
                        maw={700}
                        placeholder="Choose file"
                        label="Wordlist"
                        disabled={!doDictionary}
                        accept="text/plain"
                        onChange={handleFileChange}
                    />
                    <Divider mt={10}/>
                    <h3>Other options:</h3>
                    <Checkbox
                        label="Perform DNS Zone Transfer"
                        {...form.getInputProps('domainScanConfig.zoneTransfer', {type: 'checkbox'})}
                    />
                    <Checkbox
                        mt={10}
                        label="Gather information from DNS records"
                        {...form.getInputProps('domainScanConfig.dnsRecords', {type: 'checkbox'})}
                    />
                    <Checkbox
                        mt={10}
                        label="Inspect HTTP headers of found domains"
                        {...form.getInputProps('domainScanConfig.httpHeaders', {type: 'checkbox'})}
                    />
                    <Divider mt={10}/>
                </Tabs.Panel>
                <Tabs.Panel value="vulnScan">
                    <p>Vulnerability scan configuration options:</p>
                    <TextInput
                        maw={700}
                        label="Ports to scan (e.g. 1000-2000,443,80,22,8080)"
                        placeholder="e.g. example.com"
                        {...form.getInputProps('vulnScanConfig.scannedPorts')}
                        mb={10}
                    />
                    <Checkbox
                        label="Check for unencrypted communication"
                        {...form.getInputProps('vulnScanConfig.unencryptedCommunication', {type: 'checkbox'})}
                    />
                    <Checkbox
                        mt={10}
                        label="Check for weak SSH credentials"
                        {...form.getInputProps('vulnScanConfig.weakSshCredentials', {type: 'checkbox'})}
                    />
                    <Checkbox
                        mt={10}
                        label="Inspect security headers"
                        {...form.getInputProps('vulnScanConfig.securityHeaders', {type: 'checkbox'})}
                    />
                    <Checkbox
                        mt={10}
                        label="Inspect SSL security of HTTPS services"
                        {...form.getInputProps('vulnScanConfig.sslIssues', {type: 'checkbox'})}
                    />
                    <Divider mt={10}/>
                </Tabs.Panel>
            </Tabs>
            <Group position="left" mt="md">
                <Button type="submit" color="green"
                        onClick={submitForm}>Submit</Button>
            </Group>
        </PageWrapper>
    )
}