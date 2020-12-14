const BaiduUtil = require('./baidu_util.js');

const fs = require('fs');
const Config = require('../config/config.json');
const env = Config.ENV;


class TmallUtil {
    async ocrCheck(path) {
        let rsv = ""
        //读取任务截图，以后改成爬虫自动获取
        let test = new BaiduUtil();
        let imageData = fs.readFileSync(path);
        let imageDataBase64 = Buffer.from(imageData).toString("base64");
        //图片中文字识别，提取打卡关键字
        let ocrResult = await test.ocrFilter(imageDataBase64, '对我说');
        let ocrArray = ocrResult.data;
        //加一条指令，让天猫精灵闭嘴
        ocrArray.push({words: '对我说“闭嘴”'});
        for (let i = 0; i < ocrResult.data.length; i++) {
            let cmdStr = ocrResult.data[i].words.replace(/[^\u4e00-\u9fa5]/gi, "").replace('对我说', '天猫精灵,');
            rsv += cmdStr+","
        }

        console.log("打卡任务执行完毕");
        return rsv
    }


}

module.exports = TmallUtil;
