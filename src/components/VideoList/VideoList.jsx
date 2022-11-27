import React from "react";
import { Group, Text } from "@mantine/core";
import {IconChevronRight } from "@tabler/icons";
import { useStyle } from "./videoList.styles";

const VideoList = (props) => {
    const opened = false;
    const { classes } = useStyle({ opened });
    return (
        <div style={{ padding: "20px" }}>
            <Group noWrap>
            {/* <Avatar src={props.image} size={94} radius="md" /> */}
            <img alt="video-thumbnail" src={props.thumb} />
            <div>
                <Text
                size="lg"
                weight={500}
                className={classes.name}
                >
                {props.cname}
                </Text>

                {/* <Group noWrap spacing={10} mt={3}>
                <IconAt stroke={1.5} size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                    {props.inst}
                </Text>
                </Group> */}
            </div>

            {<IconChevronRight size={14} stroke={1.5} />}
            </Group>
        </div>
    )
}

export default VideoList