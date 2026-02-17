const { fetchProblemDetails } = require("../apis/problemAdminApi");
const submissionQueueProducer = require("../producers/submissionQueueProducer");



class SubmissionService {

    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }


    async addSubmission(submissionPayload) {

        const problemId = submissionPayload.problemId;
        const userId = submissionPayload.userId;


        const problemAdminApiResponse = await fetchProblemDetails(problemId);

        if (!problemAdminApiResponse) {
            return { success: false, message: "Problem not found" };
        }


        console.log("this is problemAdminApiResponse", problemAdminApiResponse);

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(obj => obj.language.toLowerCase() === submissionPayload.language.toLowerCase());

        console.log(languageCodeStub);

        submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;

        const submission = await this.submissionRepository.createSubmission(submissionPayload);

        if (!submission) {
            return { success: false, message: "submission not create" };
        }


        console.log("submission :  ", submission);


        // 



    }
}

module.exports = SubmissionService;