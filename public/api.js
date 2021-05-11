const API = {
  async getLastWorkout() {
    console.log('you are in api.js get last workout function');
    let res;
    console.log(res);
    try {
      res = await fetch("/api/workout");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },

  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workout/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workout/range", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    let res;
    try {
      res = await fetch("/api/workout/range");
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};