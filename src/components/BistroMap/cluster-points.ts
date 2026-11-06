export type PointPosition = { id: string; x: number; y: number };
export type PointCluster = { ids: string[]; x: number; y: number; count: number };

// Each position represents one bistro, including seasonal/planned records.
export function clusterPoints(positions: PointPosition[], zoom: number): PointCluster[] {
  const radius = zoom < 6 ? 96 : 84;
  const groups: PointCluster[] = [];
  for (const position of positions) {
    const group = groups.find((item) => Math.hypot(item.x - position.x, item.y - position.y) < radius);
    const count = 1;
    if (group) {
      const n = group.ids.length;
      group.x = (group.x * n + position.x) / (n + 1);
      group.y = (group.y * n + position.y) / (n + 1);
      group.ids.push(position.id);
      group.count += count;
    } else {
      groups.push({ ids: [position.id], x: position.x, y: position.y, count });
    }
  }
  return groups;
}
