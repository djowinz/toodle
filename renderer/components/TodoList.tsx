import { Box, Button, Checkbox, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { EmailMessage } from "../mocks/EmailMessages";
import { useEffect, useState } from "react";
import { format, isThisYear, isToday } from "date-fns";

type IProps = {
    todos: Array<EmailMessage>;
    removeFromToDos: (selected: Array<string>) => void;
};
const TodoList: React.FC<IProps> = ({ todos, removeFromToDos }) => {
    const [localTodos, setLocalTodos] = useState([...todos]);
    const [shiftPressed, isShiftPressed] = useState(false);
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
        const derivedTodos = [];
        todos.forEach((message) => {
            const messageCopy = { ...message };
            const date = Date.parse(message.timestamp);
            if (isToday(date)) {
                messageCopy.timestamp = format(date, "p");
            } else if (isThisYear(date)) {
                messageCopy.timestamp = format(date, "MMM d");
            } else {
                messageCopy.timestamp = format(date, "MMM d, yyyy");
            }
            derivedTodos.push(messageCopy);
        });
        setLocalTodos([...derivedTodos]);
    }, [todos]);

    const handleSelect = (messageId: string) => {
        if (selected.length > 0 && shiftPressed) {
            if (messageId === selected[selected.length - 1]) {
                setSelected([messageId]);
                return;
            }
            const start = localTodos.findIndex((message) => message.id === selected[0]);
            const end = localTodos.findIndex((message) => message.id === messageId);
            const setRange = [];

            if (end > start) {
                localTodos.forEach((message, idx) => {
                    if (idx >= start && idx <= end) {
                        setRange.push(message.id);
                    }
                });
            } else {
                localTodos.forEach((message, idx) => {
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

    const removeToDos = () => {
        setSelected([]);
        removeFromToDos(selected);
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
                padding="0 10px"
                color="white"
            >
                <Box w="100%" display="flex" flexDirection="row">
                    <i>Todo</i>
                    {localTodos.length > 0 ? (
                        <Box
                            marginLeft="8px"
                            fontWeight="bold"
                            fontSize="12px"
                            bg="red.500"
                            display="block"
                            w="22px"
                            h="20px"
                            borderRadius={50}
                            textAlign="center"
                            verticalAlign="center"
                            alignContent="center"
                            justifyContent="center"
                        >
                            {localTodos.length}
                        </Box>
                    ) : null}
                </Box>
                <Button
                    variant="primary"
                    fontSize="14px"
                    _hover={{
                        bg: "#0e0e52",
                    }}
                    isDisabled={!selected.length}
                    onClick={removeToDos}
                >
                    Remove Todos
                </Button>
            </Box>
            <Box
                bg="gray.900"
                flexDirection="column"
                display="flex"
                flexBasis="60%"
                flexGrow={1}
                flexShrink={1}
                w="100%"
                h="100%"
                overflowY="scroll"
                overflowX="hidden"
            >
                {localTodos.length === 0 ? (
                    <Box
                        display="flex"
                        w="100%"
                        h="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            marginTop="-80px"
                            fontWeight="bold"
                            fontSize="24px"
                            textShadow="1px 2px black"
                        >
                            No todo's
                        </Box>
                    </Box>
                ) : (
                    <TableContainer display="flex" w="100%" overflowY="scroll" overflowX="hidden">
                        <Table size="sm" style={{ tableLayout: "fixed" }}>
                            <Tbody display="block">
                                {localTodos.map((message) => {
                                    const isSelected = selected.includes(message.id);
                                    return (
                                        <>
                                            <Tr
                                                w="100%"
                                                display="flex"
                                                bg={
                                                    isSelected
                                                        ? "blue.500"
                                                        : !message.isRead
                                                        ? "gray.400"
                                                        : "gray.500"
                                                }
                                                style={{
                                                    fontWeight: !message.isRead ? "bold" : "normal",
                                                    userSelect: "none",
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
                                                    <Checkbox
                                                        onChange={() => handleSelect(message.id)}
                                                        isChecked={selected.includes(message.id)}
                                                    />
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
                                        </>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </>
    );
};

export default TodoList;
