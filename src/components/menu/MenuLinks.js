import React from 'react';
import {IconHome, IconScan, IconSettings, IconSquareRoundedPlus, IconUser} from '@tabler/icons-react';
import {Group, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {NavLink} from "react-router-dom";
import "../../index.css"

export function MenuLink({icon, color, label, linkTo}) {
    return (
        <NavLink
            style={{textDecoration: "none"}}
            to={linkTo}
            className={({isActive, isPending}) =>
                isActive
                    ? "active"
                    : isPending
                        ? "pending"
                        : ""
            }
        >
            <UnstyledButton
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >

                <Group>

                    <ThemeIcon color={color} variant="light">
                        {icon}
                    </ThemeIcon>
                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton>
        </NavLink>
    );
}

let data = [
    {icon: <IconHome size="1rem"/>, color: 'red', label: 'Dashboard', linkTo: "/dashboard"},
    {icon: <IconSquareRoundedPlus size="1rem"/>, color: 'blue', label: 'New Scan', linkTo: "/newScan"},
    {icon: <IconScan size="1rem"/>, color: 'teal', label: 'Scans', linkTo: "/scans"},
    {icon: <IconSettings size="1rem"/>, color: 'violet', label: 'Configuration', linkTo: "/config"},
    {icon: <IconUser size="1rem"/>, color: 'grape', label: 'Administration', linkTo: "/administration"}
];

const getRole = () => {
    let tokenBody = JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]))
    return tokenBody.userRole
}

export function MenuLinks() {
    if (!(getRole() === "ADMINISTRATOR")) {
        data.pop()
        data.pop()
    }
    const links = data.map((link) => <MenuLink {...link} key={link.label}/>);
    return <div>{links}</div>;
}