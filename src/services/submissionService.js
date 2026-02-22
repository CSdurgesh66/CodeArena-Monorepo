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


        const testcases = problemAdminApiResponse.data.testCases[0].input;

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(obj => obj.language.toLowerCase() === submissionPayload.language.toLowerCase());

        if(languageCodeStub === undefined) return {message:"language not supported"};

        submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;

        const submission = await this.submissionRepository.createSubmission(submissionPayload);

        if (!submission) {
            return { success: false, message: "submission not create" };
        }

        const response = await submissionQueueProducer({
            code: submission.code,
            language: submission.language,
            inputCase: problemAdminApiResponse.data.testCases[0].input,
            outputCase: problemAdminApiResponse.data.testCases[0].output,
            userId,
            submission_id:submission._id
        });

        return {
        success: true,
        submissionId: submission._id,
        status: "Pending"
    };

    }
}

module.exports = SubmissionService;