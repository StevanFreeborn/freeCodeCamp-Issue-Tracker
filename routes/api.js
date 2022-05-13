'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {

      let project = req.params.project;

      res.status(200).send('not yet implemented');

    })

    .post(function (req, res) {

      let project = req.params.project;

      rres.status(200).send('not yet implemented');

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
