import React from "react";
import { UnstyledButton, Group, Text } from "@mantine/core";
import { IconAt, IconChevronRight } from "@tabler/icons";
import { useStyle } from "./courseList.styles";

const CourseList = (props) => {
  const opened = false;
  const { classes } = useStyle({ opened });

  function extractSummary(iCalContent) {
    var rx = /(?:(?:\?|&)list=)((?!videoseries)[a-zA-Z0-9_]*)/g;
    var arr = rx.exec(iCalContent);
    // console.log(arr[1]);
    return arr[1];
  }

  const listID = extractSummary(props.link);

  return (
    <div style={{ padding: "20px" }}>
      <UnstyledButton
        className={classes.user}
        onClick={() => {
          window.location = `/course/${listID}/${props.id}`;
        }}
      >
        <Group noWrap>
          {/* <Avatar src={props.image} size={94} radius="md" /> */}
          <div>
            <Text
              size="xs"
              sx={{ textTransform: "uppercase" }}
              weight={700}
              color="dimmed"
            >
              Course ID: {props.id}
            </Text>

            <Text size="lg" weight={500} className={classes.name}>
              {props.cname}
            </Text>

            <Group noWrap spacing={10} mt={3}>
              <IconAt stroke={1.5} size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {props.inst}
              </Text>
            </Group>
          </div>

          {<IconChevronRight size={14} stroke={1.5} />}
        </Group>
      </UnstyledButton>
    </div>
  );
};

export default CourseList;
