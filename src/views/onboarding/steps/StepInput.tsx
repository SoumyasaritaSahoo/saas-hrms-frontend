"use client";

import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const StepInput = forwardRef<HTMLInputElement, Props>(
  ({ error, style, ...props }, ref) => (
    <div>
      <input
        ref={ref}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${error ? "#f87171" : "#30363d"}`,
          color: "#e6edf3",
          fontSize: 22,
          padding: "8px 0",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderBottomColor = error ? "#f87171" : "#6366f1";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderBottomColor = error ? "#f87171" : "#30363d";
        }}
        {...props}
      />
      {error && (
        <p style={{ color: "#f87171", fontSize: 13, margin: "6px 0 0" }}>{error}</p>
      )}
    </div>
  ),
);

StepInput.displayName = "StepInput";
export default StepInput;
