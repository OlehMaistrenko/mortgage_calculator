import makeRequest from "../makeRequest";

export function updateBank(id, data) {
  return makeRequest({
    url: `/banks/${id}`,
    method: "patch",
    data: data,
  });
}

export function createBank(data) {
  return makeRequest({
    url: `/banks`,
    method: "post",
    data: data,
  });
}

export function getBanks() {
  return makeRequest({ url: "/banks", method: "get" });
}

export function deleteBank(id) {
  return makeRequest({
    url: `/banks/${id}`,
    method: "delete",
  });
}
