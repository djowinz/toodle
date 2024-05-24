import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import MailList from "../../components/MailList";
import { inboxState, todoState } from "../../lib/state";
import { useRecoilState } from "recoil";

export default function Inbox() {
    const [inbox, setInbox] = useRecoilState(inboxState);
    const addToDo = (selected: Array<string>) => {
        // TODO: add message to group and post to server, set order in dropped location via element overlap lookup
    };

    return (
        <React.Fragment>
            <Flex minHeight="100vh" overflow={"hidden"}>
                <Box display="flex" w="100%" h="100%" flexDirection="column">
                    <MailList inbox={inbox} onAddToDo={addToDo} />
                </Box>
            </Flex>
        </React.Fragment>
    );
}
