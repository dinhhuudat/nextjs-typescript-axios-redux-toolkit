import request from "@/utils/axios";

async function createDesk() {
  return request("/new/shuffle/?deck_count=1", {
    method: "GET",
  });
}

async function getDrawn(deck_id: string) {
  return request(`/${deck_id}/draw/?count=1`, {
    method: "GET",
  });
}

export { createDesk, getDrawn };
