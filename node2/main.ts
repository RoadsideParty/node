import puppeteer from "puppeteer";
import fs from 'fs'
async function test() {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('https://www.baidu.com')
    await page.screenshot({
        path: './node2/screenshot.png',
        type: 'png',
        fullPage: true
    })
    const pdfBuffer = await page.pdf()
    fs.writeFileSync('./node2/pdf.pdf', pdfBuffer)
    await browser.close()
}

test()