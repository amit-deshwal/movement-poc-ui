"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy, Download, Edit } from "lucide-react";

interface CodeBlockProps {
  language: string;
  value: string;
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedValue);
  };

  const handleDownload = () => {
    const blob = new Blob([editedValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <textarea
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="w-full h-full p-4 bg-gray-800 text-white font-mono"
          rows={editedValue.split("\n").length}
        />
      ) : (
        <SyntaxHighlighter language={language} style={vscDarkPlus}>
          {editedValue}
        </SyntaxHighlighter>
      )}
      <div className="absolute top-2 right-2 space-x-2">
        <Button size="sm" variant="ghost" onClick={handleCopy}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
