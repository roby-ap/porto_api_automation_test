const request_url = require("supertest")("http://barru.pythonanywhere.com"); // URL NGARAH KESINI
const validasi = require("chai").expect;


// var Student = {
//     name : "ABC",
//     age : 18,
//     dept : "CSE",
//     score : 90
// };
// module.exports = {Student};

// data
const email_registered = "belajarmocha@gmail.com";
const email_unregistered = "belajarmocha_unreg@gmail.com";
const email_invalid_format = "belajarmochagmail.com";
const pass_true = "belajarmocha";
const pass_false = "asdasdasd";
const statusCode_ok = 200;
const statusCode_mna = 405;
const statusCode_420 = 420;
const statusCode_ise = 500;

describe("Login Feature", function () { 

    it("Login Success (POST)", async function () { 
        const response = await request_url
            .post("/login") 
            .send({ email: email_registered, password: pass_true });

        const isi_body = response.body;

        if (validasi(isi_body).to.include.keys("credentials", "data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_ok)) {

            if (validasi(isi_body.credentials).to.include.keys("access_token", "expired_in", "refresh_token")) {

                // check access token data
                let data_cred_access_token = isi_body.credentials.access_token;
                validasi(data_cred_access_token).to.be.a("string");
                validasi(data_cred_access_token).to.satisfy(function (data) {
                    // console.log("check : "+data);
                    if (data != null && data != "" && (data != 0 || data != "0")) {
                        return true;
                    } else {
                        return false;
                    }                
                });

                // check access expired in
                let data_cred_expired_in = isi_body.credentials.expired_in;
                validasi(data_cred_expired_in).to.be.a("number");
                validasi(data_cred_expired_in).to.satisfy(function (data) {
                    // console.log("check : "+data);
                    if (data != null && data != "" && (data != 0 || data != "0")) {
                        return true;
                    } else {
                        return false;
                    }                
                });

                // check access refresh token
                let data_cred_refresh_token = isi_body.credentials.refresh_token;
                validasi(data_cred_refresh_token).to.be.a("string");
                validasi(data_cred_refresh_token).to.satisfy(function (data) {
                    // console.log("check : "+data);
                    if (data != null && data != "" && (data != 0 || data != "0")) {
                        return true;
                    } else {
                        return false;
                    }                
                });
            
            }

            validasi(isi_body.data).that.contains('Welcome');
            validasi(isi_body.message).to.eql('Anda Berhasil Login');
            validasi(isi_body.status).to.eql('SUCCESS_LOGIN'); 

        }

    });

    it("Login Failed : email registered & empty password", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: email_registered, password: ""});

        const isi_body = response.body;

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contains(' not found');
            validasi(isi_body.message).to.eql('Email atau Password Anda Salah');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : email registered & password not true (string)", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: email_registered, password: pass_false });

        const isi_body = response.body;

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contains(' not found');
            validasi(isi_body.message).to.eql('Email atau Password Anda Salah');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : email (integer) & fill in password", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: 123, password: pass_false });

        const isi_body = response.body;

        validasi(response.statusCode).to.eql(statusCode_ise)
     
    });

    it("Login Failed : email registered & password not true (integer)", async function () {

        const response = await request_url
            .post("/login") 
            .send({ email: email_registered, password: 123 });

        const isi_body = response.body;

        validasi(response.statusCode).to.eql(statusCode_ise)
     
    });

    it("Login Failed : email unregistered & fill in password", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: email_unregistered, password: ""});

        const isi_body = response.body;

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contains(' not found');
            validasi(isi_body.message).to.eql('Email atau Password Anda Salah');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : email unregistered & empty password", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: email_unregistered, password: ""});

        const isi_body = response.body;

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contains(' not found');
            validasi(isi_body.message).to.eql('Email atau Password Anda Salah');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : email invalid format & fill in password", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: email_invalid_format, password: pass_false });

        const isi_body = response.body;

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).to.eql('Email tidak valid');
            validasi(isi_body.message).to.eql('Cek kembali email anda');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : email invalid format & empty password", async function () {
        const response = await request_url
            .post("/login") 
            .send({ email: email_invalid_format, password: ""});

        const isi_body = response.body;

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).to.eql('Email tidak valid');
            validasi(isi_body.message).to.eql('Cek kembali email anda');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : empty email and password", async function () {

        const response = await request_url
            .post("/login") 
            .send({ email: "", password: ""});

        const isi_body = response.body;   

        if (validasi(response.statusCode).to.eql(statusCode_420) && validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).to.eql('Email tidak valid');
            validasi(isi_body.message).to.eql('Cek kembali email anda');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : email reach maximum character (50)", async function () {

        let email_max_50 = Array.from(Array(51-(email_registered.length)), () => Math.floor(Math.random() * 36).toString(36)).join('')+email_registered;

        const response = await request_url
            .post("/login") 
            .send({ email: email_max_50, password: pass_true });

        const isi_body = response.body;      

        if (validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contains('maksimal karakter');
            validasi(isi_body.message).to.eql('Gagal Login');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');

        }
     
    });

    it("Login Failed : password reach maximum character (20)", async function () {

        let pass_max_20 = Array.from(Array(21-(pass_true.length)), () => Math.floor(Math.random() * 36).toString(36)).join('')+pass_true;

        const response = await request_url
            .post("/login") 
            .send({ email: email_registered, password: pass_max_20 });

        const isi_body = response.body;      

        if (validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contains('maksimal karakter');
            validasi(isi_body.message).to.eql('Gagal Login');
            validasi(isi_body.status).to.eql('FAILED_LOGIN');   

        }
     
    });

    it("Login Failed : use GET method", async function () {

        const response = await request_url
            .get("/login") 
            .send({ email: email_registered, password: pass_true });

        const isi_body = response.body;      

        validasi(response.statusCode).to.eql(statusCode_mna)
     
    });

});