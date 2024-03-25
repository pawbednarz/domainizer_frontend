import {useForm} from "@mantine/form"
import {Box, TextInput, Group, Button, Title} from "@mantine/core"
import axios from "axios";
import {API_URL} from "../consts";
import {errorToast} from "../helper";

export const Login = () => {

    // clear session storage when user enter the page
    sessionStorage.setItem("token", "")

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    });

    const submitLogin = () => {
        axios.post(
            API_URL + "/authentication/authenticateUser",
            form.values
        ).then(res => {
            sessionStorage.setItem("token", res.data.token)
            window.location = "/dashboard"
        })
            .catch(err => {
                if (err.response.status === 401) {
                    errorToast("Invalid username or password.")
                } else {
                    errorToast("Something went wrong. Please contact administrator, or try again later.")
                }
            })
    }

    const submitWithEnter = (e) => {
        if (e.key === "Enter") {
            submitLogin()
        }
    }

    return <>
        <Box maw={340} mx="auto" style={{
            position: "relative",
            top: "50%",
            transform: "translateY(130%)"
        }}>
            <Title order={3}>Login to Domainizer</Title>
            <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} onKeyUp={submitWithEnter}/>
            <TextInput type="password" mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} onKeyUp={submitWithEnter}/>
            <Group justify="center" mt="xl">
                <Button onClick={submitLogin} fullWidth color="green">Login</Button>
            </Group>
        </Box>
        </>
}