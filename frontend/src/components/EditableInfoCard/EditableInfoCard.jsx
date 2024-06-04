import React, { useState } from "react";

const EditableInfoCard = ({
  title,
  value,
  onSave,
  children,
  onUpdate,
  readonly,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave?.();
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 relative">
      <h2 className="text-xl font-bold">{title}</h2>
      {isEditing ? (
        <div>
          {children ? (
            React.cloneElement(children, {
              value: value,
              onChange: (e) => {
                console.log("onchange!", e);
              },
            })
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onUpdate?.(e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          )}
          <button onClick={handleSave} className="btn-primary mt-2">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn-secondary mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="mt-2">{value}</p>
          <button
            style={{ display: readonly ? "none" : "block" }}
            onClick={() => setIsEditing(true)}
            className="btn-edit absolute top-4 right-4"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableInfoCard;
