import * as migration_20260314_140510_planning_events from './20260314_140510_planning_events';
import * as migration_20260314_144357_resources_page from './20260314_144357_resources_page';

export const migrations = [
  {
    up: migration_20260314_140510_planning_events.up,
    down: migration_20260314_140510_planning_events.down,
    name: '20260314_140510_planning_events',
  },
  {
    up: migration_20260314_144357_resources_page.up,
    down: migration_20260314_144357_resources_page.down,
    name: '20260314_144357_resources_page'
  },
];
