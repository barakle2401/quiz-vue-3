export default {
  async getRequest(url, headers = {}) {
    try {
      const response = await fetch(url, {
        headers: headers,
      });
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  },
};
