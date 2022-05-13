'use strict';
const Project = require('../models/project');
const Issue = require('../models/issue');

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async (req, res) => {

      // get project name from path
      let projectName = req.params.project;

      // check if project already exists
      let project = await Project.findOne({ name: projectName }).exec().catch(err => console.log(err));

      // if project does not already exists create it and save it
      if (!project) {

        project = new Project({
          name: projectName
        });

        project = await project.save().catch(err => console.log(err));

      }

      // find all issues filtering by the requests query
      // if successful return matching issues
      // if failure return error
      Issue.find(req.query)
      .then( issues => {

        res.status(200).json(issues);

      })
      .catch( err => {

        console.log(err);

        return res.status(200).json({
          error: 'Could not get issues'
        });

      });

    })

    .post(async (req, res) => {

      // get project name from path
      const projectName = req.params.project;

      // check if project already exists
      let project = await Project.findOne({ name: projectName }).exec().catch(err => console.log(err));

      // if project does not already exists create it and save it
      if (!project) {

        project = new Project({
          name: projectName
        });

        project = await project.save().catch(err => console.log(err));

      }

      // check if request has all required fields
      // if it does not respond with error
      if(!req.body.issue_title || !req.body.issue_text || !req.body.created_by) 
        return res.status(200).json({
          error: 'required field(s) missing'
         });
        
      // create new issue
      const issue = new Issue({

        projectId: project.id,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text

      });

      // save issue
      // if save successful return newly created issue as json object
      // if save fails return error message
      issue.save()
      .then( issue => {

        res.status(200).json(issue);

      })
      .catch( err => {
        
        console.log(err);

        return res.status(200).json({
          error: 'Could not save issue'
        });

      });

    })

    .put(function (req, res) {

      let project = req.params.project;

      res.status(200).send('not yet implemented');

    })

    .delete(function (req, res) {

      let project = req.params.project;

      res.status(200).send('not yet implemented');

    });

};
