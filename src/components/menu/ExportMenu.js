import {Button, Menu} from "@mantine/core";
import axios from "axios";
import {API_URL} from "../../consts";

export const ExportMenu = (props) => {

    const downloadFile = (filetype) => {
        axios.get(API_URL + props.exportUrl + "?type=" + filetype,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                responseType: "blob"
            })
            .then(res => res.data)
            .then(res => {
                console.log(res)
                const url = window.URL.createObjectURL(
                    new Blob([res], {
                        type: "text/plain",
                        encoding: "UTF-8"
                    })
                )
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", "domainExport." + filetype)
                document.body.appendChild(link)
                link.click()
                link.remove()
            })

    }


    return <Menu trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
            <Button>Export</Button>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item component="span" onClick={() => downloadFile("txt")}>
                As TXT
            </Menu.Item>
            <Menu.Item component="span" onClick={() => downloadFile("pdf")}>
                As PDF
            </Menu.Item>
            <Menu.Item component="span" onClick={() => downloadFile("csv")}>
                As CSV
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
}