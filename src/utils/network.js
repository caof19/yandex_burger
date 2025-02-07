export function checkResponse(resp) {
  if (!resp.ok) throw new Error("Ошибка загрузки данных");

  return resp.json()
}