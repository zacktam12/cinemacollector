import { useState } from "react";

/**
 * Custom hook for drag and drop functionality
 */
export function useDragAndDrop(items, onReorder) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDraggedOver(index);
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDraggedOver(index);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedItem === null || draggedItem.index === dropIndex) {
      setDraggedItem(null);
      setDraggedOver(null);
      return;
    }

    const newItems = [...items];
    const draggedItemData = newItems[draggedItem.index];

    // Remove from old position
    newItems.splice(draggedItem.index, 1);

    // Insert at new position
    newItems.splice(dropIndex, 0, draggedItemData);

    onReorder(newItems);

    setDraggedItem(null);
    setDraggedOver(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
  };

  return {
    draggedItem,
    draggedOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}

