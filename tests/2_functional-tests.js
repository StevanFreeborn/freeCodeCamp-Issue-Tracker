const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Issue = require('../models/issue');
const { nanoid } = require('nanoid');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const project = 'testing';

    const issue = {

        issue_title: `Test Issue ${nanoid(10)}`,
        issue_text: 'This is a test issue',
        created_by: 'Robot',
        assigned_to: 'Stevan',
        open: true,
        status_text: 'development'

    };

    const openFilter = { open: true };
    const statusFilter = { status_text: 'development' };

    test('POST /api/issues/{project} create an issue with every field', (done) => {

        chai.request(server)
        .post(`/api/issues/${project}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('type')
        .send(`issue_title=${issue.issue_title}`)
        .send(`issue_text=${issue.issue_text}`)
        .send(`created_by=${issue.created_by}`)
        .send(`assigned_to=${issue.assigned_to}`)
        .send(`open=${issue.open}`)
        .send(`status_text=${issue.status_text}`)
        .end((err, res) => {

            if (err) console.log(err);
            console.log(res.status);
            console.log(res.type);
            console.log(res.text);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('POST /api/issues/{project} create an issue with required fields', (done) => {

        chai.request(server)
        .post(`/api/issues/${project}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('type')
        .send(`issue_title=${issue.issue_title}`)
        .send(`issue_text=${issue.issue_text}`)
        .send(`created_by=${issue.created_by}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('POST /api/issues/{project} create an issue without required fields', (done) => {

        chai.request(server)
        .post(`/api/issues/${project}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .type('type')
        .send(`issue_title=${issue.assigned_to}`)
        .send(`issue_title=${issue.open}`)
        .send(`issue_title=${issue.status_text}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('GET /api/issues/{project} view a projects issues', (done) => {

        chai.request(server)
        .get(`/api/issues/${project}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');

            done();

        });

    });

    test('GET /api/issues/{project}?open=true view a projects open issues', (done) => {

        chai.request(server)
        .get(`/api/issues/${project}`)
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
        .get(`/api/issues/${project}`)
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

        assert.fail();
        done();

    });

    test('PUT /api/issues/{project} update multiple fieds on an issue', (done) => {

        assert.fail();
        done();

    });

    test('PUT /api/issues/{project} update an issue without _id', (done) => {

        assert.fail();
        done();

    });

    test('PUT /api/issues/{project} update an issue without any fields', (done) => {

        assert.fail();
        done();

    });

    test('PUT /api/issues/{project} update an issue with invalid _id', (done) => {

        assert.fail();
        done();

    });

    test('DELETE /api/issues/{project} delete an issue', (done) => {

        assert.fail();
        done();

    });

    test('DELETE /api/issues/{project} delete an issue with invalid _id', (done) => {

        assert.fail();
        done();

    });

    test('DELETE /api/issues/{project} delete an issue with missing _id', (done) => {

        assert.fail();
        done();

    });

});
