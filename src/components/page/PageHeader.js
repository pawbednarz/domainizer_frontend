import {Group, Header} from "@mantine/core";

export const PageHeader = () => {
    return (
        <Header height={60}>
            <Group sx={{height: '100%'}} px={20} position="apart">
                <h2>Domainizer</h2>
            </Group>
        </Header>
    )
}