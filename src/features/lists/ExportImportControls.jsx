import { useRef } from "react";
import PropTypes from "prop-types";

/**
 * Controls for exporting and importing data
 */
export default function ExportImportControls({ onExport, onImport }) {
  const fileInputRef = useRef();

  return (
    <div className="export-import-controls">
      <button className="btn-export" onClick={onExport}>
        📥 Export Data
      </button>
      <button
        className="btn-import"
        onClick={() => fileInputRef.current.click()}
      >
        📤 Import Data
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={onImport}
        />
      </button>
    </div>
  );
}

ExportImportControls.propTypes = {
  onExport: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

