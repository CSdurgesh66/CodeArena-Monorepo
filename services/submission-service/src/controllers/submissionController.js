
async function createSubmission(req, res) {

    try {
        console.log('data is : ', req.body);

        const response = await this.submissionService.addSubmission(req.body);
        return res.status(201).send({
            success: true,
            error: {},
            data: response,
            message: 'created submission successfully'
        })

    } catch (error) {

        console.log("unable to create submission");
        console.log(error);
    }
}

module.exports = {
    createSubmission
}