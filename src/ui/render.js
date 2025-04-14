export function renderResult(result) {
  document.getElementById("log").textContent = JSON.stringify(result, null, 2);
}
