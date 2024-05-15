import { Box, Flex, Link, VStack, Button, Icon } from "@chakra-ui/react";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { FaInbox, FaRegPaperPlane, FaRegTrashCan, FaSheetPlastic } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { inboxState, messageControllerState } from "../lib/state";
import { useEffect, useState } from "react";

const Sidebar = () => {
	const router = useRouter();
	const [messageController, setMessageController] = useRecoilState(messageControllerState);
	const [inbox, setInbox] = useRecoilState(inboxState);
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		let count = 0;
		inbox.forEach(message => {
			if (!message.isRead) {
				count++;
			}
		});
		setUnreadCount(count);
	}, [inbox]);

	const routesTable = [
		{
			name: "Inbox",
			icon: FaInbox,
			path: "/inbox"
		},
		{
			name: "Sent",
			icon: FaRegPaperPlane,
			path: "/sent"
		},
		{
			name: "Drafts",
			icon: FaSheetPlastic,
			path: "/drafts"
		},
		{
			name: "Trash",
			icon: FaRegTrashCan,
			path: "/trash"
		}
	];

	const openCompose = () => {
		setMessageController({ open: true });
	}

	return (
		<Box w={200} minW={200} h="100%" bg="gray.700" style={{ position: "relative", zIndex: 1 }}>
			<Box flexWrap="wrap" style={{ position: "relative", zIndex: 2, transition: "width .2s ease" }}>
				<Flex paddingLeft={5} paddingRight={5} marginTop={3} marginBottom={7}>
					<Button onClick={openCompose} variant="ghost" bg="blue.500" _hover={{ background: "blue.600" }} marginTop={3} size="sm" w="100%" justifyContent="center">
						Compose
					</Button>
				</Flex>
				<VStack align="flex-start" spacing={0}>
					{routesTable.map((route, _) => (
						<Link
							as={NextLink}
							w="100%"
							padding={3}
							href={route.path}
							color="gray.300"
							key={route.name}
							bg={router.pathname === route.path ? "gray.600" : "gray.700"}
							_hover={{ background: router.pathname === route.path ? "gray.600" : "gray.800" }}
						>
							<Flex position="relative" alignItems="center">
								<Icon as={route.icon} boxSize={3.5} marginRight={3} />
								{route.name}
								{route.name === "Inbox" && unreadCount > 0 ? (
									<Box
										bg="blue.500"
										padding="2px 6px"
										borderRadius={50}
										style={{ color: "white", fontWeight: "bold", fontSize: "0.65em" }}
										position="absolute"
										right={0}
									>
										{unreadCount}
									</Box>
								) : null}
							</Flex>
						</Link>
					))}
				</VStack>
			</Box>
		</Box>
	);
};

export default Sidebar;