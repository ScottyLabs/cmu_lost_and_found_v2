function memoize<T>(fn: (...args: unknown[]) => Promise<T>): () => Promise<T> {
  const cache: { [key: string]: T } = {};
  return async function (...args: unknown[]): Promise<T> {
    const argString = JSON.stringify(args);
    cache[argString] = cache[argString] || (await fn(...args));
    return cache[argString];
  };
}

export default memoize;
