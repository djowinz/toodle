import { Box, Checkbox, Tr } from "@chakra-ui/react";
import { EmailMessage } from "../mocks/EmailMessages";
import TableData from "./table/TableData";

type IProps = {
    message: EmailMessage;
    isSelected: boolean;
    selected: Array<string>;
    handleSelect: (messageId: string) => void;
};
const MailListItem: React.FC<IProps> = ({ message, isSelected, selected, handleSelect }) => {
    return (
        <Tr
            w="100%"
            display="flex"
            bg={isSelected ? "blue.500" : !message.isRead ? "gray.600" : "gray.500"}
            style={{
                fontWeight: !message.isRead ? "bold" : "normal",
                userSelect: "none",
                color: "white"
            }}
            _hover={{ cursor: "pointer" }}
            key={message.id}
        >
            <TableData flex="0 0 auto" flexBasis="40px" minW="40px" overflow="hidden">
                <Checkbox
                    onChange={() => handleSelect(message.id)}
                    isChecked={selected.includes(message.id)}
                />
            </TableData>
            <TableData flex="0 0 auto" flexBasis="150px" minW="150px" overflow="hidden">
                <Box
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    title={message.name}
                >
                    {message.name}
                </Box>
            </TableData>
            <TableData
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
            </TableData>
            <TableData flex="0 0 auto" flexBasis="130px" minW="130px">
                <Box textAlign="right">{message.timestamp}</Box>
            </TableData>
        </Tr>
    );
};

export default MailListItem;
