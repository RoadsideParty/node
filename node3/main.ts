import axios from "axios";
import { load } from "cheerio";
import puppeteer from "puppeteer";

const request = axios.create({
    baseURL: ''
})

async function getHtml() {
    const { data } = await request({
        url: '/',
        method: 'GET'
    })
    const $ = load(data)
    console.log($('video').attr('src'));
}
// getHtml()
async function test() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('')
    const htmlHandle = await page.$('.cate-list')
    const html = await page.evaluate(body => body!.innerHTML, htmlHandle)
    console.log(html);
    await browser.close()
}

test()