import { EntityTypeChart } from "./entity-type-chart";
import { EntityCategoryChart } from "./entity-category-chart";
import type { EntityTypeStats, EntityCategoryStats } from "@/lib/types/dashboard";

type EntityStatsChartProps = {
  typeData: EntityTypeStats[];
  categoryData: EntityCategoryStats[];
};

export function EntityStatsChart({ typeData, categoryData }: EntityStatsChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <EntityTypeChart data={typeData} />
      <EntityCategoryChart data={categoryData} />
    </div>
  );
}
