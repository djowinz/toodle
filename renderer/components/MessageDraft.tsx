import { useRef, useState } from "react";
import { Box, Button, Flex, Icon, Input, Spacer } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { messageControllerState, inboxState, emptyMessageState } from "../lib/state";
import { FaXmark } from "react-icons/fa6";
import ContentEditable from 'react-contenteditable'
import { v4 as uuidv4 } from 'uuid';

const MessageDraft = () => {
    const emptyMessageState = {
        id: '',
        timestamp: '',
        to: '',
        name: 'Example Name',
        from: 'example@email.com',
        subject: '',
        body: '',
        isRead: false
    };
    const [inbox, setInbox] = useRecoilState(inboxState);
    const [draftMessage, setDraftMessage] = useState({ ...emptyMessageState });
    const [messageController, setMessageController] = useRecoilState(messageControllerState);
    const editRef = useRef();

    const persistNewMessage = () => {
        if (draftMessage.to === '' || draftMessage.subject === '') {
            return;
        }
        const messageWrapper = { ...draftMessage };
        
        messageWrapper.id = uuidv4();
        messageWrapper.timestamp = new Date().toISOString();

        const inboxCopy = [...inbox];
        inboxCopy.push(messageWrapper);
        inboxCopy.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);
        setInbox([...inboxCopy]);

        setMessageController({ open: false });
        setDraftMessage({ ...emptyMessageState });
    }

    const resetDraft = () => {
        setDraftMessage({ ...draftMessage, to: '', subject: '', body: '' });
        setMessageController({ open: false});
    }

    if (messageController.open) {
        return (
            <>
                <Box h={600} w={580} right={30} bottom={-1} position="absolute" bg="gray.700" border="1px" borderColor="gray.600" borderTopRightRadius={5} borderTopLeftRadius={5}>
                    <Box bg="gray.800" borderTopRightRadius={5} borderTopLeftRadius={5} position="relative">
                        <Flex padding={3} justifyContent="space-between" alignItems="center">
                            <Box color="gray.200" fontSize="sm">
                                New Message
                            </Box>
                            <Icon as={FaXmark} onClick={resetDraft} cursor="pointer" color="gray.300" />
                        </Flex>
                        <Flex padding={3} direction="column" bg="gray.700" style={{ overflow: 'hidden' }}>
                            <Input onChange={(e) => setDraftMessage({ ...draftMessage, to: e.target.value })} variant="unstyled" placeholder="To" color="gray.200" value={draftMessage.to} />
                            <Box h={2} borderTop="1px solid" borderColor="gray.600" marginTop={2} />
                            <Input onChange={(e) => setDraftMessage({ ...draftMessage, subject: e.target.value })} variant="unstyled" placeholder="Subject" color="gray.200" value={draftMessage.subject} />
                            <Box h={2} borderTop="1px solid" borderColor="gray.600" marginTop={2} />
                            <ContentEditable innerRef={editRef} html={draftMessage.body} onChange={(e) => setDraftMessage({ ...draftMessage, body: e.target.value })} style={{ color: "gray.200", outline: "none", border: "none", backgroundColor: "transparent", height: "385px", overflowY: "auto" }} />
                        </Flex>
                    </Box>
                    <Flex h="60px" padding={3} direction="row" bg="gray.600" position="absolute" left={0} right={0} bottom={1}>
                        <Button onClick={persistNewMessage} isDisabled={(draftMessage.to === '' || draftMessage.subject === '')} variant="ghost" bg="blue.500" _hover={{ background: "blue.600" }} size="sm" w="100%" justifyContent="center">
                            Send
                        </Button>
                    </Flex>
                </Box>
            </>
        )
    }

    return null;
}

export default MessageDraft;