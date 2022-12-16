import fs from 'fs'
import xlsx from 'node-xlsx'
type TDataItem = string | null
type TOperate = '+' | '-' | '*' | '/'
function createCalc(max: number, min: number, num: number, operate: TOperate) {
    const data: TDataItem[][] = []
    const result: TDataItem[][] = []
    for (let i = 0; i < num / 10 * 2; i++) {
        const dataItem: TDataItem[] = []
        const resultItem: TDataItem[] = []
        for (let j = 0; j < 10; j++) {
            if (j % 2 === 0) {
                const num1 = Math.floor(Math.random() * (max - min + 1) + min)
                let num2 = Math.floor(Math.random() * (max - min + 1) + min)
                while (operate === '/' && num2 === 0) {
                    num2 = Math.floor(Math.random() * (max - min + 1) + min)
                }
                switch (operate) {
                    case '+':
                        dataItem.push(`${num1}+${num2}=`)
                        break;
                    case '-':
                        dataItem.push(`${num1}-${num2}=`)
                        break;
                    case '*':
                        dataItem.push(`${num1}*${num2}=`)
                        break;
                    case '/':
                        dataItem.push(`${num1}/${num2}=`)
                        break;
                }
                resultItem.push(null)
            } else {
                dataItem.push(null)
                resultItem.push(eval(dataItem.at(-2)!.slice(0, -1)))
            }
        }
        data.push(dataItem)
        result.push(resultItem)
    }
    return [{ name: '计算式', data: data, options: {} }, { name: '答案集', data: result, options: {} }]
}
const data = createCalc(100, 0, 100, '+')
const buffer = xlsx.build(data);
fs.writeFile('./calc.xlsx', buffer, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});