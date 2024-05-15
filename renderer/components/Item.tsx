import { Tr } from "@chakra-ui/react";
import { forwardRef } from "react";

const Item = forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
    return (
        <Tr w="100%" display="flex" ref={ref} {...props}>
            {children}
        </Tr>
    );
});

export default Item;
