const request_url = require("supertest")("http://barru.pythonanywhere.com"); // URL NGARAH KESINI
const validasi = require("chai").expect;

// const {Student} = require('./login.js');
// console.log(Student.name);

// data

const random_data = Array.from(Array(9), () => Math.floor(Math.random() * 36).toString(36)).join('');
const email_random = random_data+"@rap.com";
const pass_random = "pass-"+random_data;
const name_random = "name-"+random_data;
console.log(email_random, pass_random, name_random);

// const email_registered = "belajarmocha@gmail.com";
// const email_unregistered = "belajarmocha_unreg@gmail.com";
const email_invalid_format = email_random.replace("@", "A");
// const pass_true = "belajarmocha";
// const pass_false = "asdasdasd";
const statusCode_ok = 200;
const statusCode_mna = 405;
const statusCode_420 = 420;
const statusCode_ise = 500;

describe("Register Feature", function () { 

    it("Register Success ("+email_random+")", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random, name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_ok)) {

            validasi(isi_body.data).to.eql('berhasil');
            validasi(isi_body.message).to.eql('created user!');
            validasi(isi_body.status).to.eql('SUCCESS_REGISTER');   

        }
     
    });

    it("Check New User ("+email_random+")", async function () { 
        const response = await request_url
            .post("/login") 
            .send({ email: email_random, password: pass_random });

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

    it("Register Failed : email already exist ("+email_random+")", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random, name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).that.contain('Email sudah terdaftar');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : email empty", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: "", password: pass_random, name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).that.contain('tidak boleh kosong');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : password empty", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: "", name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).that.contain('tidak boleh kosong');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : name empty", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random, name: ""});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).that.contain('tidak boleh kosong');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : invalid email format ("+email_invalid_format+")", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_invalid_format, password: pass_random, name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).to.eql('Email tidak valid');
            validasi(isi_body.message).to.eql('Cek kembali email anda');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : password contain symbol", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random+"!@#$%", name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).to.eql('Nama atau password tidak valid');
            validasi(isi_body.message).to.eql('Tidak boleh mengandung symbol');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : name contain symbol", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random, name: name_random+"!@#$%"});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") && validasi(response.statusCode).to.equal(statusCode_420)) {

            validasi(isi_body.data).to.eql('Nama atau password tidak valid');
            validasi(isi_body.message).to.eql('Tidak boleh mengandung symbol');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : email reach maximum characters (50)", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: Array.from(Array(51-(email_random.length)), () => Math.floor(Math.random() * 36).toString(36)).join('')+email_random, password: pass_random, name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") ) {

            validasi(isi_body.data).that.contain('maksimal karakter');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : password reach maximum characters (20)", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: Array.from(Array(21-(pass_random.length)), () => Math.floor(Math.random() * 36).toString(36)).join('')+pass_random, name: name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status") ) {

            validasi(isi_body.data).that.contain('maksimal karakter');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : name reach maximum characters (20)", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random, name: Array.from(Array(21-(name_random.length)), () => Math.floor(Math.random() * 36).toString(36)).join('')+name_random});

        const isi_body = response.body;

        // console.log(isi_body);

        if (validasi(isi_body).to.include.keys("data", "message", "status")) {

            validasi(isi_body.data).that.contain('maksimal karakter');
            validasi(isi_body.message).to.eql('Gagal Registrasi');
            validasi(isi_body.status).to.eql('FAILED_REGISTER');   

        }
     
    });

    it("Register Failed : email fill in with integer", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: 123, password: pass_random, name: name_random});

        const isi_body = response.body;

        validasi(response.statusCode).to.eql(statusCode_ise)
     
    });

    it("Register Failed : password fill in with integer", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: 123, name: name_random});

        const isi_body = response.body;

        validasi(response.statusCode).to.eql(statusCode_ise)
     
    });

    it("Register Failed : name fill in with integer", async function () {
        const response = await request_url
            .post("/register") 
            .send({ email: email_random, password: pass_random, name: 123});

        const isi_body = response.body;

        validasi(response.statusCode).to.eql(statusCode_ise)
     
    });

    it("Register Failed : use GET method", async function () {

        const response = await request_url
            .get("/register") 
            .send({ email: email_random, password: pass_random, name: name_random });

        const isi_body = response.body;      

        validasi(response.statusCode).to.eql(statusCode_mna)
     
    });

});