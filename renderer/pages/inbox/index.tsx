import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import MailList from "../../components/MailList";
import TodoList from "../../components/TodoList";
import { inboxState, todoState } from "../../lib/state";
import { useRecoilState } from "recoil";

export default function Inbox() {
	const [inbox, setInbox] = useRecoilState(inboxState);
	const [todos, setTodos] = useRecoilState(todoState);
	const addToDo = (selected: Array<string>) => {
		// filter out inbox items
		const updatedInbox = [];
		const todoMessages = [...todos];
		inbox.forEach(message => {
			if (!selected.includes(message.id)) {
				updatedInbox.push(message);
			} else {
				todoMessages.push(message);
			}
		});

		todoMessages.sort((a, b) => {
			return Date.parse(b.timestamp) - Date.parse(a.timestamp);
		});

		setInbox(updatedInbox);
		setTodos(todoMessages);
	}

	const removeTodo = (selected: Array<string>) => {
		const updatedInbox = [...inbox];
		const todoMessages = [];
		todos.forEach(message => {
			if (!selected.includes(message.id)) {
				todoMessages.push(message);
			} else {
				updatedInbox.push(message);
			}
		});

		updatedInbox.sort((a, b) => {
			return Date.parse(b.timestamp) - Date.parse(a.timestamp);
		});

		setInbox(updatedInbox);
		setTodos(todoMessages);
	}
	return (
		<React.Fragment>
			<Flex minHeight="100vh" overflow={"hidden"}>
				<Box display="flex" w="100%" h="100%" flexDirection="column">
					<MailList inbox={inbox} onAddToDo={addToDo} />
					<TodoList todos={todos} removeFromToDos={removeTodo} />
				</Box>
			</Flex>
		</React.Fragment>
	);
}
