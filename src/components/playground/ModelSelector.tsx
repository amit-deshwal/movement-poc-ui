"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const models = [
  { value: "gemini-1.5-flash", label: "gemini-1.5-flash" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "claude-v1", label: "Claude v1" },
  { value: "claude-instant-v1", label: "Claude Instant v1" },
];

export function ModelSelector({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        const selectedModel = models.find(
          (model) => model.value === selectedValue
        );
        if (selectedModel) {
          onValueChange(selectedValue);
        } else {
          console.error("Selected value not found in models:", selectedValue);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select model..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
