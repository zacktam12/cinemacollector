import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Tags manager component for custom movie collections
 */
export default function TagsManager({ movieId, currentTags = [], onUpdateTags, allTags = [] }) {
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (tag) => {
    if (!currentTags.includes(tag)) {
      onUpdateTags(movieId, [...currentTags, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    onUpdateTags(
      movieId,
      currentTags.filter((t) => t !== tag)
    );
  };

  const handleCreateNewTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      handleAddTag(newTag.trim());
      setNewTag("");
      setShowTagInput(false);
    }
  };

  const availableTags = allTags.filter((tag) => !currentTags.includes(tag));

  return (
    <div className="tags-manager">
      <div className="tags-header">
        <span className="tags-label">🏷️ Tags</span>
        <button
          className="btn-add-tag"
          onClick={() => setShowTagInput(!showTagInput)}
          title="Add tag"
        >
          +
        </button>
      </div>

      {/* Current Tags */}
      <div className="current-tags">
        {currentTags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button
              className="tag-remove"
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove ${tag} tag`}
            >
              ×
            </button>
          </span>
        ))}
        {currentTags.length === 0 && (
          <span className="no-tags">No tags yet</span>
        )}
      </div>

      {/* Add Tag Interface */}
      {showTagInput && (
        <div className="tag-input-panel">
          {/* Existing Tags */}
          {availableTags.length > 0 && (
            <div className="available-tags">
              <p className="available-tags-label">Quick Add:</p>
              <div className="tag-suggestions">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    className="tag-suggestion"
                    onClick={() => handleAddTag(tag)}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Create New Tag */}
          <div className="new-tag-input">
            <input
              type="text"
              placeholder="Create new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateNewTag();
                } else if (e.key === "Escape") {
                  setShowTagInput(false);
                  setNewTag("");
                }
              }}
              autoFocus
            />
            <button className="btn-create-tag" onClick={handleCreateNewTag}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

TagsManager.propTypes = {
  movieId: PropTypes.string.isRequired,
  currentTags: PropTypes.arrayOf(PropTypes.string),
  onUpdateTags: PropTypes.func.isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string),
};

