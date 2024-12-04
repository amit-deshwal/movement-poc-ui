import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ModelControlCenterProps {
  temperature: number;
  setTemperature: (value: number) => void;
  topP: number;
  setTopP: (value: number) => void;
  frequencyPenalty: number;
  setFrequencyPenalty: (value: number) => void;
  presencePenalty: number;
  setPresencePenalty: (value: number) => void;
}

export function ModelControlCenter({
  temperature,
  setTemperature,
  topP,
  setTopP,
  frequencyPenalty,
  setFrequencyPenalty,
  presencePenalty,
  setPresencePenalty,
}: ModelControlCenterProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="temperature">
          Temperature: {temperature.toFixed(2)}
        </Label>
        <Slider
          id="temperature"
          min={0}
          max={2}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => setTemperature(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="top-p">Top P: {topP.toFixed(2)}</Label>
        <Slider
          id="top-p"
          min={0}
          max={1}
          step={0.1}
          value={[topP]}
          onValueChange={(value) => setTopP(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="frequency-penalty">
          Frequency Penalty: {frequencyPenalty.toFixed(2)}
        </Label>
        <Slider
          id="frequency-penalty"
          min={-2}
          max={2}
          step={0.1}
          value={[frequencyPenalty]}
          onValueChange={(value) => setFrequencyPenalty(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="presence-penalty">
          Presence Penalty: {presencePenalty.toFixed(2)}
        </Label>
        <Slider
          id="presence-penalty"
          min={-2}
          max={2}
          step={0.1}
          value={[presencePenalty]}
          onValueChange={(value) => setPresencePenalty(value[0])}
        />
      </div>
    </div>
  );
}
