// A string Choices value references a branch; only its terminal descendants qualify.
export function resolveChoices(nodes, code, datasets = {}) {
  const choices = nodes[code]?.Choices;
  if (choices === undefined) return undefined;
  if (Array.isArray(choices)) return [...choices];
  if (choices && typeof choices === 'object') {
    if (Object.keys(choices).join() !== 'Dataset' || !Object.hasOwn(datasets, choices.Dataset)) throw Error(`Unknown Choices dataset: ${code}`);
    return datasets[choices.Dataset].records.map(record => record.id);
  }
  if (typeof choices !== 'string' || !choices || !Object.hasOwn(nodes, choices))
    throw Error(`Unknown Choices reference: ${code}`);
  const leaves = [], active = new Set();
  function visit(current) {
    if (!Object.hasOwn(nodes, current) || active.has(current)) throw Error(`Invalid Choices tree: ${code}`);
    active.add(current);
    const children = Object.values(nodes[current].Children || {});
    if (!children.length) leaves.push(current);
    else children.forEach(visit);
    active.delete(current);
  }
  const children = Object.values(nodes[choices].Children || {});
  if (!children.length) throw Error(`Choices must reference a nonempty branch: ${code}`);
  children.forEach(visit);
  return leaves;
}
