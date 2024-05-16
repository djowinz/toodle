import React from "react";
import Sidebar from "../components/Sidebar";
import { Flex } from "@chakra-ui/react";
import Search from "../components/Search";
import MessageDraft from "../components/MessageDraft";

const Layout = ({ children }) => {
    return (
        <>
            <Flex direction="row" h="100vh">
                <Sidebar />
                <Flex direction="column" flexGrow={1}>
                    <Search />
                    {children}
                    <MessageDraft />
                </Flex>
            </Flex>
        </>
    );
};

export default Layout;
