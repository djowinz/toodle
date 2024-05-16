import { useDraggable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

type IProps = PropsWithChildren & { id: string };
const Draggable: React.FC<IProps> = ({ children, id }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};

export default Draggable;
