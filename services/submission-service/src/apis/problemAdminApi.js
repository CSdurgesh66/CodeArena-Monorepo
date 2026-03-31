
const axiosIntance = require('../config/axiosInstance');

async function fetchProblemDetails(problemId) {

    try {

        const response = await axiosIntance.get(`/api/v1/problems/${problemId}`);
        console.log("Api response: ", response.data);
        return response.data;

    } catch (error) {
        console.log("Something went wrong while fetching problem details");
        console.log(error);
    }

}

module.exports = {
    fetchProblemDetails
}