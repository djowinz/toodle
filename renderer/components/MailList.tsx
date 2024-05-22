import { useRecoilState } from "recoil";
import { inboxState } from "../lib/state";
import { Box, Button, Checkbox, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format, isThisYear, isToday } from "date-fns";
import { EmailMessage } from "../mocks/EmailMessages";
import MailListItem from "./MailListItem";

type IProps = {
    inbox: Array<EmailMessage>;
    onAddToDo: (selected: Array<string>) => void;
};
const MailList: React.FC<IProps> = ({ onAddToDo, inbox }) => {
    const [shiftPressed, isShiftPressed] = useState(false);
    const [tempInbox, setTempInbox] = useState([...inbox]);
    const [selected, setSelected] = useState<string[]>([]);

    const keycontroller = (e: KeyboardEvent, dir: string) => {
        if (e.key === "Shift") {
            isShiftPressed(dir === "down");
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", (e) => keycontroller(e, "down"));
        window.addEventListener("keyup", (e) => keycontroller(e, "up"));
        return () => {
            window.removeEventListener("keydown", (e) => keycontroller(e, "down"));
            window.removeEventListener("keyup", (e) => keycontroller(e, "up"));
        };
    }, []);

    useEffect(() => {
        const derivedInbox = [];
        inbox.forEach((message) => {
            const messageCopy = { ...message };
            const date = Date.parse(message.timestamp);
            if (isToday(date)) {
                messageCopy.timestamp = format(date, "p");
            } else if (isThisYear(date)) {
                messageCopy.timestamp = format(date, "MMM d");
            } else {
                messageCopy.timestamp = format(date, "MMM d, yyyy");
            }
            derivedInbox.push(messageCopy);
        });
        setTempInbox(derivedInbox);
    }, [inbox]);

    const handleSelect = (messageId: string) => {
        if (selected.length > 0 && shiftPressed) {
            if (messageId === selected[selected.length - 1]) {
                setSelected([messageId]);
                return;
            }
            const start = tempInbox.findIndex((message) => message.id === selected[0]);
            const end = tempInbox.findIndex((message) => message.id === messageId);
            const setRange = [];

            if (end > start) {
                tempInbox.forEach((message, idx) => {
                    if (idx >= start && idx <= end) {
                        setRange.push(message.id);
                    }
                });
            } else {
                tempInbox.forEach((message, idx) => {
                    if (idx >= end && idx <= start) {
                        setRange.push(message.id);
                    }
                });
            }

            setSelected(setRange);
        } else {
            if (selected.includes(messageId)) {
                setSelected(selected.filter((i) => i !== messageId));
            } else {
                setSelected([...selected, messageId]);
            }
        }
        return;
    };

    const convertToTodos = () => {
        onAddToDo(selected);
        setSelected([]);
    };

    return (
        <>
            <Box
                bg="gray.700"
                w="100%"
                h="50px"
                display="flex"
                flexDirection="row"
                fontSize="13px"
                fontWeight="bold"
                alignItems="center"
                justifyContent="space-between"
                color="white"
                padding="0 10px"
            >
                <Box w="100%" display="flex" flexDirection="row">
                    <i>Inbox</i>
                    {tempInbox.length > 0 ? (
                        <Box
                            marginLeft="8px"
                            fontWeight="bold"
                            fontSize="12px"
                            bg="red.500"
                            display="block"
                            h="20px"
                            borderRadius={50}
                            textAlign="center"
                            verticalAlign="center"
                            alignContent="center"
                            justifyContent="center"
                            minW="32px"
                        >
                            {tempInbox.length}
                        </Box>
                    ) : null}
                </Box>

                <Button
                    variant="primary"
                    fontSize="14px"
                    _hover={{
                        bg: "#0e0e52",
                    }}
                    disabled={!selected}
                    onClick={convertToTodos}
                >
                    Add Todo
                </Button>
            </Box>
            <Box
                display="flex"
                flexBasis="60%"
                flexGrow={1}
                flexShrink={1}
                w="100%"
                h="100%"
                overflowX="hidden"
            >
                <TableContainer display="flex" w="100%" overflowY="scroll" overflowX="hidden">
                    <Table size="sm" style={{ tableLayout: "fixed" }}>
                        <Tbody display="block">
                            {tempInbox.map((message, idx) => {
                                const isSelected = selected.includes(message.id);
                                return (
                                    <>
                                        <MailListItem
                                            message={message}
                                            isSelected={isSelected}
                                            selected={selected}
                                            handleSelect={handleSelect}
                                        />
                                        {message.id === selected[selected.length - 1] && (
                                            <Tr w="100%" display="flex">
                                                <Td display="flex" flex="1 1 auto">
                                                    <Button
                                                        size="xs"
                                                        variant="ghost"
                                                        bg="blue.500"
                                                        _hover={{ background: "blue.600" }}
                                                        onClick={convertToTodos}
                                                    >
                                                        Add ToDo
                                                    </Button>
                                                </Td>
                                                <Td display="flex" flex="0 0 auto"></Td>
                                                <Td display="flex" flex="0 0 auto"></Td>
                                                <Td display="flex" flex="0 0 auto"></Td>
                                            </Tr>
                                        )}
                                    </>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default MailList;
