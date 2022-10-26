import { API_KEY, API_URL } from "./constants";


/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */

export const getTasks = async (successCallback) => {
  const header = {
    headers: {
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(`${API_URL}/tasks`, header);
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
 * Add New Task to existing
 * @param {object} body - Object required from server to save Task
 * @param {function} successCallback - Function that saves incoming data
 */

export const addTask = async (body, successCallback) => {
  const header = {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}/tasks`, header);
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
 * Removes Task from existing
 * @param {string} taskId - Task ID
 * @param {function} successCallback - Function that saves incoming data
 */

export const removeTask = async (taskId, successCallback) => {
  const header = {
    method: "DELETE",
    headers: {
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, header);
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
 * Set Task status as closed
 * @param {string} taskId - Task ID
 * @param {object} body - Object required from server to update Task
 * @param {function} successCallback - Function that saves incoming data
 */

export const finishTask = async (taskId, body, successCallback) => {
  const header = {
    method: "PUT",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, header);
    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Błąd!");
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};