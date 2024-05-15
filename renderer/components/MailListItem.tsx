import { Box, Checkbox, Td, Tr } from "@chakra-ui/react";
import { EmailMessage } from "../mocks/EmailMessages";

type IProps = {
    message: EmailMessage;
    isSelected: boolean;
    selected: Array<string>;
    handleSelect: (messageId: string) => void;
}
const MailListItem: React.FC<IProps> = ({ message, isSelected, selected, handleSelect }) => {
    return (
        <Tr
            w="100%"
            display="flex"
            bg={isSelected ? "blue.500" : !message.isRead ? "gray.600" : ""}
            style={{ 
                fontWeight: !message.isRead ? "bold" : "normal", 
                userSelect: "none" 
            }}
            _hover={{ cursor: "pointer" }}
            key={message.id}
        >
            <Td
                flex="0 0 auto"
                flexBasis="40px"
                minW="40px"
                overflow="hidden"
            >
                <Checkbox onChange={() => handleSelect(message.id)} isChecked={selected.includes(message.id)} />
            </Td>
            <Td
                flex="0 0 auto"
                flexBasis="150px"
                minW="150px"
                overflow="hidden"
            >
                <Box
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    title={message.name}
                >
                    {message.name}
                </Box>
            </Td>
            <Td
                display="flex"
                flex="1 1 auto"
                minW={0}
                flexWrap="wrap"
                overflow="hidden"
                textAlign="right"
            >
                <Box
                    flexShrink="1"
                    flexGrow="1"
                    flexBasis={0}
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    textAlign="left"
                    title={message.subject}
                >
                    {message.subject}
                </Box>
            </Td>
            <Td flex="0 0 auto" flexBasis="130px" minW="130px">
                <Box textAlign="right">{message.timestamp}</Box>
            </Td>
        </Tr>
    );
}

export default MailListItem;