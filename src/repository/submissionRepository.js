const Submission = require('../models/submissionModel');

class SubmissionRepository{
    constructor(){
        this.submissionModel = Submission; 
    }

    async createSubmission(submission){
        const respone = await this.submissionModel.create(submission);
        return respone;
    }

}

module.exports = SubmissionRepository;