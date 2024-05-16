import { Flex, Input } from "@chakra-ui/react";

const Search = () => {
    return (
        <Flex bg="gray.900" maxH="70px" flex={1} padding={5} paddingTop={0}>
            <Input variant="flushed" size={"lg"} placeholder="Search" />
        </Flex>
    );
};

export default Search;
