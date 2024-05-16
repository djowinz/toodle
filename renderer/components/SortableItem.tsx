import React, { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";

type IProps = PropsWithChildren & { id: string };
const SortableItem: React.FC<IProps> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Item ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </Item>
    );
};

export default SortableItem;
