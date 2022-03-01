export const storageService = {
  save,
  load,
};
function save(entityType, entity) {
  localStorage.setItem(entityType, JSON.stringify(entity));
}
function load(entityType) {
  return JSON.parse(localStorage.getItem(entityType));
}
