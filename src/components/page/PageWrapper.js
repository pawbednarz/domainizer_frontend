import {Header} from "@mantine/core";

export const PageWrapper = (props) => {
    return (
        <Header height={50}>
            <h1 style={{marginTop: "0"}}>{props.title}</h1>
            {props.children}
        </Header>
    )
}