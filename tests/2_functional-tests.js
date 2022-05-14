const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Issue = require('../models/issue');
const { nanoid } = require('nanoid');
const { expect } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const project = 'testing';

    const issue = {

        issue_title: `Test Issue ${nanoid(10)}`,
        issue_text: 'This is a test issue',
        created_by: 'Robot',
        assigned_to: 'Stevan',
        status_text: 'development'

    };

    const openFilter = { open: true };
    const statusFilter = { status_text: 'development' };

    const updateIssueText = 'issue text has been updated.';
    const updateAssignedTo = 'Steve';

    const invalidId = '6275d73f52abd03df630186e';

    test('POST /api/issues/{project} create an issue with every field', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.issue_title }`)
        .send(`issue_text=${ issue.issue_text }`)
        .send(`created_by=${ issue.created_by }`)
        .send(`assigned_to=${ issue.assigned_to }`)
        .send(`status_text=${ issue.status_text }`)
        .end((err, res) => {

            if (err) console.log(err);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'issue_title');
            assert.property(res.body, 'issue_text');
            assert.property(res.body, 'created_by');
            assert.property(res.body, 'assigned_to');
            assert.property(res.body, 'status_text');
            assert.property(res.body, 'projectId');
            assert.property(res.body, '_id');
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'updated_on');

            done();

        });

    });

    test('POST /api/issues/{project} create an issue with required fields', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.issue_title }`)
        .send(`issue_text=${ issue.issue_text }`)
        .send(`created_by=${ issue.created_by }`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('POST /api/issues/{project} create an issue without required fields', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.assigned_to }`)
        .send(`issue_title=${ issue.status_text }`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('GET /api/issues/{project} view a projects issues', (done) => {

        chai.request(server)
        .get(`/api/issues/${ project }`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('GET /api/issues/{project}?open=true view a projects open issues', (done) => {

        chai.request(server)
        .get(`/api/issues/${ project }`)
        .query(openFilter)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('GET /api/issues/{project}?open=true&status=qa view a projects open issues in development', (done) => {

        chai.request(server)
        .get(`/api/issues/${ project }`)
        .query(openFilter)
        .query(statusFilter)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('PUT /api/issues/{project} update one field on an issue', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.issue_title }`)
        .send(`issue_text=${ issue.issue_text }`)
        .send(`created_by=${ issue.created_by }`)
        .end((err, res) => {

            if (err) console.log(err);

            chai.request(server)
            .put('/api/issues/{project}')
            .set('content-type', 'application/x-www-form-urlencoded')
            .type('form')
            .send(`_id=${ res.body._id }`)
            .send(`issue_text=${ updateIssueText }`)
            .end((err, res) => {

                if (err) console.log(err);

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');

                done();

            });


        });

    });

    test('PUT /api/issues/{project} update multiple fieds on an issue', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.issue_title }`)
        .send(`issue_text=${ issue.issue_text }`)
        .send(`created_by=${ issue.created_by }`)
        .end((err, res) => {

            if (err) console.log(err);

            chai.request(server)
            .put('/api/issues/{project}')
            .set('content-type', 'application/x-www-form-urlencoded')
            .type('form')
            .send(`_id=${ res.body._id }`)
            .send(`issue_text=${ updateIssueText }`)
            .send(`assigned_to=${ updateAssignedTo }`)
            .end((err, res) => {

                if (err) console.log(err);

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');

                done();

            });


        });

    });

    test('PUT /api/issues/{project} update an issue without _id', (done) => {

        chai.request(server)
        .put('/api/issues/{project}')
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_text=${ updateIssueText }`)
        .send(`issue_text=${ updateAssignedTo }`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('PUT /api/issues/{project} update an issue without any fields', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.issue_title }`)
        .send(`issue_text=${ issue.issue_text }`)
        .send(`created_by=${ issue.created_by }`)
        .end((err, res) => {

            if (err) console.log(err);

            chai.request(server)
            .put('/api/issues/{project}')
            .set('content-type', 'application/x-www-form-urlencoded')
            .type('form')
            .send(`_id=${ res.body._id }`)
            .end((err, res) => {

                if (err) console.log(err);

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');

                done();

            });


        });

    });

    test('PUT /api/issues/{project} update an issue with invalid _id', (done) => {

        chai.request(server)
        .put('/api/issues/{project}')
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`_id=${ invalidId }`)
        .send(`issue_text=${ updateIssueText }`)
        .send(`issue_text=${ updateAssignedTo }`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('DELETE /api/issues/{project} delete an issue', (done) => {

        chai.request(server)
        .post(`/api/issues/${ project }`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`issue_title=${ issue.issue_title }`)
        .send(`issue_text=${ issue.issue_text }`)
        .send(`created_by=${ issue.created_by }`)
        .end((err, res) => {

            if (err) console.log(err);

            chai.request(server)
            .delete('/api/issues/{project}')
            .set('content-type', 'application/x-www-form-urlencoded')
            .type('form')
            .send(`_id=${ res.body._id }`)
            .end((err, res) => {

                if (err) console.log(err);

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');

                done();

            });


        });

    });

    test('DELETE /api/issues/{project} delete an issue with invalid _id', (done) => {

        chai.request(server)
        .delete('/api/issues/{project}')
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(`_id=${ invalidId }`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('DELETE /api/issues/{project} delete an issue with missing _id', (done) => {

        chai.request(server)
        .delete('/api/issues/{project}')
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('form')
        .send(``)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

});
