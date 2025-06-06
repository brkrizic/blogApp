import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onApply: () => void;
  options: FilterOption[];
  onChangeFilter: (id: string) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onToggle,
  onApply,
  options,
  onChangeFilter,
  buttonRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle, buttonRef]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, buttonRef]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  if (!isOpen || !portalTarget) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={{ top: position.top, left: position.left }}
      className="absolute z-50 w-48 bg-white border border-gray-300 rounded shadow-lg p-4 space-y-3"
      role="menu"
    >
      <h4 className="text-gray-700 font-semibold mb-2">Filter Options</h4>

      {options.map(({ id, label, checked }) => (
        <label
          key={id}
          className="flex items-center space-x-2 cursor-pointer"
          htmlFor={id}
        >
          <input
            id={id}
            type="checkbox"
            className="form-checkbox text-blue-600"
            checked={checked}
            onChange={() => onChangeFilter(id)}
          />
          <span>{label}</span>
        </label>
      ))}

      <button
        className="w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={onApply}
      >
        Apply Filters
      </button>
    </div>,
    portalTarget
  );
};
