# Practice: Pokemon API + My Favorites

## Demo Video
https://www.youtube.com/watch?v=HgyuOqKwaLQ

# How to Start
`npm install -g expo-cli`

`git clone -b Hw8 https://github.com/roto93/React-Native-practice.git`

`cd React-Native-practice`

`npm install`

`npm start -r`

# Features

- 串接 [pokemon API](https://pokeapi.co) 
- 每頁顯示20隻
- 左右兩側按鈕可換頁
- 長按神奇寶貝可顯示詳細資訊
- 點擊神奇寶貝會儲存，選中的會變色顯示
- clear 按鈕會清除所有儲存的項目
- See my pokemon 按鈕會進到 stack page，用 FlatList 每列顯示三隻

# 心得
### 1 
我覺得最複雜的是 fetch 資料的結構和流程控制。我們沒辦法預期 api 提供的資料結構，像之前作業用到的幾乎是簡單的 JSON，頂多一兩層。但這次的api最先回傳的是像這樣

```javascript
{
next: '...',
previous: '...',
results:[
 {
  name: 'xxx',
  url: 'xxxxx',
 },
 
}
```

一下是物件一下是陣列，要讀取細節還必須再fetch一次，調用的時候需要時時清楚 data 當時是什麼格式，不然如果其實 data 是 array，卻讀取 data.name 會跳 error，像老師之前說的 async await 真的需要花時間熟練，尤其是跟 setState 交互使用時會常常錯誤卻不知道為什麼。我覺得可能要多練習思考 life cycle，這樣之後在管理 promise、state、variable、useEffect 時才不會一直腦袋打結XD

### 2
Flat list 的使用

設定`numColumns`可以改變每列要顯示的元件數量，畫面變得好好看！！！

另一個大發現是如果把 renderData 從原本的 function 改成 component 的形式，就能在裡面額外使用 hook！雖然這份作業沒用到，但之前曾經有想要用卻沒辦法～ 現在有解決辦法了!

### 3
git branch

花了不少時間研究怎麼使用 github，發現用 branch 的方式可以在一個 repo 裡設置不同分支放不同作業，真是太方便了！最近再來把之前的作業用分支整理好XD





