import * as migration_20260314_140510_planning_events from './20260314_140510_planning_events';

export const migrations = [
  {
    up: migration_20260314_140510_planning_events.up,
    down: migration_20260314_140510_planning_events.down,
    name: '20260314_140510_planning_events'
  },
];
