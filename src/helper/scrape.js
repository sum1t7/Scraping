import  Cheerio  from "cheerio";
import request from "request";
import {URL} from "./BaseUrl.js";

export async function getMeaning(word) {
    return new Promise((resolve, reject) => {
        request(`${URL}=${word}`, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const $ = Cheerio.load(body);
                const means = $('#maint > .word_mean_desc_css > a.hin_dict_span > span:eq(1)').text();
                resolve(means);
            } else {
                reject(error);
            }
        });
    });
}