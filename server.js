const Koa = require("koa");

const fetch = require("node-fetch");

const HttpsProxyAgent = require('https-proxy-agent');

const HttpProxyAgent = require('http-proxy-agent');

const getCoinOrderList = async (item) => {
    console.log(item.s);
    await fetch(`http://api.coinbene.com/v1/market/trades?symbol=${item.s}`, {
        method: 'GET',
        agent: new HttpProxyAgent("http://127.0.0.1:8123"),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }).then(res => res.text()).then((json) => {
        console.log(json);
    }).catch((err) => {
        console.log(err);
    });
}

const intervalFunction = async () => {
    await fetch("https://a.coinbene.com/market/site/tradepair/group/quote?group=USDT&sortField=&sortType=", {
        method: 'GET',
        agent: new HttpsProxyAgent("http://127.0.0.1:8123"),
        headers: {
            site: 'MAIN',
            lang: 'zh_CN'
        }
    }).then(res => res.json()).then((json) => {
        console.log(json);
        json.data.map(async (item) => {
            await getCoinOrderList(item);
        })
    });
}

setInterval(() => {
    intervalFunction();
}, 1000);