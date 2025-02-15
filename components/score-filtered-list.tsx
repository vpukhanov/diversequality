"use client";

import { useState } from "react";

import ScoreFilter, { ScoreFilterValue } from "@/components/score-filter";

interface FilteredListProps<T extends { score: number }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function ScoreFilteredList<T extends { score: number }>({
  items,
  renderItem,
}: FilteredListProps<T>) {
  const [filter, setFilter] = useState<ScoreFilterValue>("all");

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "positive") return item.score > 0;
    return item.score < 0;
  });

  return (
    <>
      <div className="flex justify-center">
        <ScoreFilter value={filter} onChange={setFilter} />
      </div>
      {filteredItems.map((item) => renderItem(item))}
    </>
  );
}
