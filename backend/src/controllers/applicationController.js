import * as applicationService from "../services/applicationServices.js";


export async function getStudentProfile(req, res) {

    try {
   
        const profile = await applicationService.getStudentProfile(req.user.email);

        res.status(200).json(profile);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

}

export async function applyProject(req, res) {

    try {

        const result = await applicationService.applyProject(
    req.user.email,
    req.user,
    req.body
);

        res.status(201).json(result);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

}

export async function getMyApplications(req, res) {

    try {

        const result = await applicationService.getMyApplications(
            req.user.email
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

}