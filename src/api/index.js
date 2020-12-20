import axios from "axios";

/* export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
} */

export async function getLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinksByTag(tag) {
  try {
    const { data } = await axios.get(`/api/tags/${tag}/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createLinksWithTags(url, comment, name) {
  const dataToSend = { url, comment, name };
  try {
    const { data } = await axios.post(`/api/links`, dataToSend);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateLink(id, comment) {
  const dataToSend = { comment };
  try {
    const { data } = await axios.patch(`/api/links/${id}`, dataToSend);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addClick(id) {
  const dataToSend = { id };
  try {
    const { data } = await axios.patch(`/api/links/${id}/add`, dataToSend);
    return data;
  } catch (error) {
    throw error;
  }
}
