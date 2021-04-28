export default function(string) {
  if (!string) return string;

  return string.replace(/\s/g, '');
}
