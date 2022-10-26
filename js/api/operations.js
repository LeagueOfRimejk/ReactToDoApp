import { API_KEY, API_URL } from "./constants";


/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */

export const getOperations = async (id, successCallback) => {
  const header = {
    headers: {
        Authorization: API_KEY,
      },
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${id}/operations`, header);
    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Błąd!");
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};

/**
 * Add New operation
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 * @param {object} body - Object passed to server to save operation
 */

export const addOperation = async (id, body, successCallback) => {
  const header = {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${id}/operations`, header);
    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Błąd!");
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};

/**
 * Remove existing operation
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */

export const removeOperation = async (id, successCallback) => {
  const header = {
    method: "DELETE",
    headers: {
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(`${API_URL}/operations/${id}`, header);
    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Błąd!");
    }
    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};

/**
 * Update Time needed for operation
 * @param {string} id - ID of task
 * @param {object} body - Object passed to server to update operation
 * @param {function} successCallback - Function that saves incoming data
 */

export const setOperationTime = async (id, body, successCallback) => {
  const header = {
    method: "PUT",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}/operations/${id}`, header);
    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Błąd!");
    }
    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};