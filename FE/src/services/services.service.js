/**
* @param {string} url
* @param {RequestInit} options
* @returns Promise<Response>
*/

async function efetch(url, options = {}) {
    let result = {};
    let json = {};

    try {
        result = await fetch(url, options);
        json = await result.json();
    } catch (error) {
        throw new Error(error.message);
    } if (!result.ok || json.status !== 'success') {
        throw new Error(json.message);
    } 
    return json.data;
}

function makeServicesService() {
  const baseUrl = "/api/v1/services";

  async function fetchServices(page, limit = 10) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    const data = await efetch(url);

    data.services = data.services.map((service) => {
      return {
        ...service,
      };
    });
    return data;
  }

  async function fetchService(services_id) {
    const { service } = await efetch(`${baseUrl}/${services_id}`);
    return {
      ...service,
    };
  }

  async function createService(service) {
    return efetch(baseUrl, {
      method: "POST",
      body: service,
    });
  }

  async function deleteAllServices() {
    return efetch(baseUrl, {
      method: "DELETE",
    });
  }
  async function updateService(services_id, service) {
    return efetch(`${baseUrl}/${services_id}`, {
      method: "PUT",
      body: service,
    });
  }
  async function deleteService(services_id) {
    return efetch(`${baseUrl}/${services_id}`, {
      method: "DELETE",
    });
  }
  return {
    fetchServices,
    fetchService,
    createService,
    updateService,
    deleteService,
    deleteAllServices,
  };
} export default makeServicesService();