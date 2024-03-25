import {useRouteError} from "react-router-dom";
import "../index.css"
import {Center} from "@mantine/core";

export const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);

    return (

        <div id="error-page">
            <Center><h1>Oops!</h1></Center>
            <Center><p>Sorry, an unexpected error has occurred.</p></Center>
            <Center>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </Center>
        </div>
    )
}