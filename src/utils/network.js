export function checkResponse(resp) {
  if (!resp.ok && resp.status !== 403) throw new Error("Ошибка загрузки данных");

  return resp.json()
}