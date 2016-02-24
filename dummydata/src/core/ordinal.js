var _ordinal = 0;

export default function(seed) {
  var value = parseFloat(_ordinal);
  if (seed) value = parseFloat(seed);
  if (Number.isNaN(value)) value = seed || 0;
  _ordinal = ++value;
  return value;
}
