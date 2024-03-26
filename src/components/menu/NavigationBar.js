import {Navbar} from "@mantine/core";
import {MenuLink, MenuLinks} from "./MenuLinks";
import {IconLogout} from '@tabler/icons-react';

export const NavigationBar = () => {

    const logout = () => {
        console.log(1234)
    }

    return (
        <Navbar width={{base: 300}} p="xs">
            <Navbar.Section grow mt="xs">
                <MenuLinks/>
            </Navbar.Section>
            <Navbar.Section>
                <MenuLink icon={<IconLogout size="1rem"/>} color='gray' label='Logout' linkTo="/login"
                          onClick={() => logout()}/>
                <br/>
            </Navbar.Section>
        </Navbar>
    )
}