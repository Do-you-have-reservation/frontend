import React from "react";

export interface Props {
  handleAddToQueue(text: string): void;
  setItems(items: any): void;
  items: [];
}
