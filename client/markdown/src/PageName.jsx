import { useState } from "react";

export default function PageName({ page, onRename }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(page.fileName);

  const startEditing = () => setEditing(true);

  const stopEditing = async () => {
    setEditing(false);

    // Only update if changed
    if (name !== page.fileName) {
      await onRename(page._id, { fileName: name });
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      stopEditing();
    }

    if (e.key === "Escape") {
      setName(page.fileName);
      setEditing(false);
    }
  };

  return (
    <div className="font-medium text-gray-800">
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={stopEditing}
          onKeyDown={handleKeyDown}
          className="border rounded px-2 py-1 w-full"
          autoFocus
        />
      ) : (
        <div onDoubleClick={startEditing}>
          {page.fileName}
        </div>
      )}
    </div>
  );
}
