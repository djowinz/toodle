import React, { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable: React.FC<PropsWithChildren> = ({ children }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  
  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Droppable;