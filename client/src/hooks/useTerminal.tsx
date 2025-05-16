import { useState } from "react";
import { getTerminalResponse } from "@/lib/terminal-commands";

export interface CommandHistoryItem {
  command: string;
  response: string;
}

export const useTerminal = (initialHistory: CommandHistoryItem[] = []) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>(initialHistory);
  const [currentInput, setCurrentInput] = useState("");

  const executeCommand = (command: string) => {
    if (!command.trim()) return;
    
    const response = getTerminalResponse(command);
    
    setCommandHistory(prev => [...prev, { command, response }]);
    setCurrentInput("");
  };

  const clearHistory = () => {
    setCommandHistory([]);
  };

  return {
    commandHistory,
    currentInput,
    setCurrentInput,
    executeCommand,
    clearHistory,
  };
};
