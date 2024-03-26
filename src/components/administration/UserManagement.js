import {PageWrapper} from "../page/PageWrapper";
import {useForm} from "@mantine/form";
import {Box, Button, Divider, Group, Loader, Select, Table, Tabs, TextInput, Tooltip} from "@mantine/core";
import axios from "axios";
import {API_URL} from "../../consts";
import {errorToast, successToast} from "../../helper";
import {IconTrash} from "@tabler/icons-react";
import useAxios from "axios-hooks";
import * as PropTypes from "prop-types";

function Center(props) {
    return null;
}

Center.propTypes = {children: PropTypes.node};
export const UserManagement = () => {

    const [{data, loading, error}, refetch] = useAxios({
            url: API_URL + "/administration/user",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            useCache: false,
        }
    )

    const form = useForm({
        initialValues: {
            username: "",
            email: "",
            role: "User",
            password: ""
        },
        // TODO add validation
        validate: {}
    });

    const submitForm = () => {
        // TODO add check if scan exist - if yes ask if we should create a new one
        axios.post(
            API_URL + "/administration/user",
            form.values,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(() => {
            successToast("User added successfully.")
            refetch()
        })
            .catch(err => {
                errorToast("Something went wrong.")
                refetch()
            })
    }

    const deleteUser = (id) => {
        axios.delete(
            API_URL + "/administration/user/" + id,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            }
        ).then(() => {
            successToast("User removed successfully.")
            refetch()
        })
            .catch(err => {
                errorToast("Something went wrong.")
                refetch()
            })
    }

    return (
        <PageWrapper title="Administration - user management">
            <Tabs defaultValue="UserManagement">
                <Tabs.List>
                    <Tabs.Tab value="UserManagement">User management</Tabs.Tab>
                    <Tabs.Tab value="AddUser">Add user</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="UserManagement">
                    <p>Users:</p>
                    <Box mx="left" mt={16}>
                        <Table striped highlightOnHover>
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data ? data.map(val => {
                                return <tr key={val.id}>
                                    <td>{val.username}</td>
                                    <td>{val.email}</td>
                                    <td>{val.role}</td>
                                    <td>
                                        {/*TODO implement user edit*/}
                                        {/*<Tooltip label="Show scan configuration" color="gray">*/}
                                        {/*    <IconFileSettings*/}
                                        {/*        className="scan-icon"*/}
                                        {/*    />*/}
                                        {/*</Tooltip>*/}
                                        <Tooltip label="Delete user" color="gray">
                                            <IconTrash
                                                className="scan-icon"
                                                onClick={() => deleteUser(val.id)}
                                            />
                                        </Tooltip>
                                    </td>
                                    {/*<td>Run, show result, show config, edit, delete</td>*/}
                                </tr>
                            }) : <Center><Loader color="indigo" size="xl"/></Center>}
                            </tbody>
                        </Table>
                    </Box>
                    <Divider mt={10}/>
                </Tabs.Panel>
                <Tabs.Panel value="AddUser">
                    <p>Add new user:</p>
                    <Box maw={700}>
                        <TextInput
                            label="Username"
                            {...form.getInputProps('username')}
                        />
                        <TextInput
                            label="Password"
                            {...form.getInputProps('password')}
                            type="password"

                        />
                        <TextInput
                            label="Email address"
                            {...form.getInputProps('email')}
                        />
                        <Select
                            label="role"
                            placeholder="Pick value"
                            data={["User", "Administrator"]}
                            {...form.getInputProps('role')}
                        />
                    </Box>
                    <Divider mt={10}/>
                    <Group position="left" mt="md">
                        <Button type="submit" color="green"
                                onClick={submitForm}>Submit</Button>
                    </Group>
                </Tabs.Panel>
            </Tabs>
        </PageWrapper>
    )
}