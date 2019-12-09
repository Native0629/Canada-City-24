global.server = "http://youbeksoft.com"
// global.server = "http://192.168.0.170:81"


const getCountryUrl = global.server + "/api/countries?";
const getCityUrl = global.server + "/api/cites?";
const logInUrl = global.server + "/api/users_new/login?";
const ContactUsUrl = global.server + "/api/contactUs?";
const registerUrl = global.server + "/api/users_new?";
const getNewsUrl = global.server + "/api/news?";
const getOffersUrl = global.server + "/api/offers?";
const getCouponsUrl = global.server + "/api/coupons?";
const getTvUrl = global.server + "/api/tvs?";

const getEventsUrl = global.server + "/api/events?";
const getJobsUrl = global.server + "/api/jobs?";

// const getSubcatesUrl = global.server + "/api/subcategories?";


const api = {

    getCountry() {
        // console.log('===getCountry_API===');
        result = fetch(getCountryUrl, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    getCity(id) {
        // console.log('===getCity_API===');
        // console.log('===id===', id);
        var url =  getCityUrl + "country_id=" + id;
        // console.log("get city url", url);

        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    logIn(email, password) {
        // console.log('===Login_API===');
        var url =  logInUrl + "email=" + email + "&password=" + password;
        result = fetch(url, {
            method: 'POST'
        }).then((response) => response.json());
        
        return result;
    },

    ContactUsUrl(fullName, email,phoneNumber,Subject) {
        // console.log('===Login_API===');
        var url =  ContactUsUrl + "fullName=" + fullName+ "&email=" + email + "&phoneNumber=" + phoneNumber+ "&Subject=" + Subject;
        result = fetch(url, {
            method: 'POST'
        }).then((response) => response.json());
        
        return result;
    },

    register(username, first_name, last_name,  email, birthday, phone,  password) {
        // console.log("===register_API===")
        // console.log("username=== " + username + "   " + "emami===" + email + "    " + "password===" + password);
        var url =  registerUrl +  "name=" + username + "&first_name=" + first_name + "&last_name=" + last_name +"&email=" + email + "&date_of_birth=" + birthday + "&phone_number=" + phone + "&password=" + password;  
        
        result = fetch(url, {
            method: 'POST'
        }).then((response) => response.json());
        
        return result;
    },

    getNews(country_id, city_id, current_page) {
        // console.log('===get News_API===');
        var url =  getNewsUrl + "country_id=" + country_id + "&city_id=" + city_id + "&per_page=" + 30 + "&current_page=" + current_page;
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    getOffers(country_id, city_id, category_id, current_page) {
        var url =  getOffersUrl + "country_id=" + country_id + "&city_id=" + city_id + "&category_id=" + category_id + "&per_page=" + 30 + "&current_page=" + current_page;
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    getCoupons(country_id, city_id, category_id) {
        console.log('===get News_API===');
        var url =  getCouponsUrl + "country_id=" + country_id + "&city_id=" + city_id + "&category_id=" + category_id ;
        console.log("get offers url", url);
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },


    getTvs(TvCountry_Name) {
        console.log('===get Tv Api===');
        var url =  getTvUrl + "TvCountry_Name=" + TvCountry_Name;
        console.log("get Tv url", url);
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    getEvents(country_id, city_id, current_page) {
        console.log('===get Events_API===');
        var url =  getEventsUrl + "country_id=" + country_id + "&city_id=" + city_id + "&per_page=" + 30 + "&current_page=" + current_page;
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    getJobs(country_id, city_id, current_page) {
        console.log('===get Jobs_API===');
        var url =  getJobsUrl + "country_id=" + country_id + "&city_id=" + city_id + "&per_page=" + 30 + "&current_page=" + current_page;
        result = fetch(url, {
            method: 'GET'
        }).then((response) => response.json());
        
        return result;
    },

    // getSubcates(country_id, city_id, category_id) {
    //     // console.log('===get Subcates_API===');
    //     var url =  getSubcatesUrl + "country_id=" + country_id + "&city_id=" + city_id + "&category_id=" + category_id;
    //     // console.log("getSubcatesUrl", url);
    //     result = fetch(url, {
    //         method: 'GET'
    //     }).then((response) => response.json());
        
    //     return result;
    // },
}

module.exports = api;
