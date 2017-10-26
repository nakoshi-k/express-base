"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_users_1 = require("../logger_users");
describe('test_logger', () => {
    let logger = new logger_users_1.logger_users();
    let test_user_id = "tanaka";
    it("access_log", (done) => {
        logger.access_log(test_user_id, "login").then(r => {
            done();
        }).catch(e => {
            done(e);
        });
    });
    it("access_log", (done) => {
        logger.access_log(test_user_id, "logout").then(r => {
            done();
        }).catch(e => {
            done(e);
        });
    });
    it("get_log", (done) => {
        logger.users_log(test_user_id).then(r => {
            done();
        }).catch(e => {
            done(e);
        });
    });
    it("get_log_filter", (done) => {
        logger.get_user_log(test_user_id, "login").then(r => {
            done();
        }).catch(e => {
            done(e);
        });
    });
});
