import * as projectService from "../services/projectServices.js";

export async function createProject(req, res) {
    try {
        const result = await projectService.createProject(req.body);

        res.status(201).json(result);

    } catch (error) {

        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }
}

export async function getProjects(req, res) {

    try {

        const projects = await projectService.getProjects(req.query);

        res.status(200).json(projects);

    } catch (error) {

        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

}

export async function getProjectById(req, res) {

    try {

        const project = await projectService.getProjectById(req.params.id);

        res.status(200).json(project);

    } catch (error) {

        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

}

export async function updateProject(req, res) {

    try {

        const project = await projectService.updateProject(
            req.params.id,
            req.body
        );

        res.status(200).json(project);

    } catch (error) {

        console.error(error);

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

}