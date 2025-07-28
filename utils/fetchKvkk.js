export default async function fetchKvkk() {
  const res = await fetch("/mesafeli-satis");
  return await res.text();
}
