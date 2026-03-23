/**
 * Creates a singleton factory — avoids duplicating the "let adapter = null" pattern
 * across every Payload adapter.
 *
 * Usage:
 *   export const getMyAdapter = createSingleton(() => new MyAdapter())
 */
export function createSingleton<T>(factory: () => T): () => T {
  let instance: T | null = null
  return () => {
    if (!instance) instance = factory()
    return instance
  }
}
