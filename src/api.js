import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://jobly-backend-tujy.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    let headers;
    if (JoblyApi.token !== undefined) {
      headers = {
        Authorization: `Bearer ${JoblyApi.token}`,
        "Content-Type": "application/json",
      };
    }
    const params = method === "get" ? data : {};

    try {
      if (headers) {
        return (await axios({ url, method, data, params, headers })).data;
      }
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // get list of all companies with optional name filter

  static async getCompanies(name = null) {
    if (name) {
      let res = await this.request(`companies?name=${name}`);
      return res.companies;
    }
    let res = await this.request("companies");
    return res.companies;
  }

  // get list of all jobs with optional title filter

  static async getJobs(title = null) {
    if (title) {
      let res = await this.request(`jobs?title=${title}`);
      return res.jobs;
    }
    let res = await this.request("jobs");
    return res.jobs;
  }

  // register and return token

  static async registerUser(data) {
    let res = await this.request("auth/register", data, "post");
    return res;
  }

  // Login and return token

  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  // apply to job for logged in user
  static async applyJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }

  // get user profile

  static async getProfile(username) {
    let res = await this.request(`users/${username}`);
    console.log(res);
    return res;
  }

  // update user profile

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
