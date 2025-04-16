import { Node, Status } from '../store/store';

const statusPriority: string[] = [
  'UNREACHABLE',
  'DOWN',
  'CRITICAL',
  'WARNING',
  'SHUTDOWN',
  'UP',
];

const statusColors: Record<string, string> = {
  CRITICAL: 'red',
  UNREACHABLE: 'black',
  SHUTDOWN: 'grey',
  UP: 'lightgreen',
  WARNING: 'yellow',
  DOWN: 'darkred',
};

export function getWorstStatus(nodes: Node[]): {
  status: Status | undefined;
  color: string;
} {
  if (nodes.length === 0) {
    return {
      status: undefined,
      color: 'transparent',
    };
  }

  const sorted = [...nodes]
    .map((node) => node.status)
    .sort((a, b) => {
      const aIndex = statusPriority.indexOf(a.description);
      const bIndex = statusPriority.indexOf(b.description);
      return aIndex - bIndex;
    });

  const worst = sorted[0];
  const color = statusColors[worst.description] ?? worst.color ?? 'transparent';

  return {
    status: worst,
    color,
  };
}
