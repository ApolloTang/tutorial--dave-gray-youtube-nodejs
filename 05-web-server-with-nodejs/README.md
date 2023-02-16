[How to Build a Web Server with Node JS | Node.js Tutorials for Beginners](https://www.youtube.com/watch?v=3ZAKY-CDKog&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=5)

[github.com/gitdagray/nodejs_web_server](https://github.com/gitdagray/nodejs_web_server)



## Why passing  `json` data through `JSON.parse JSON.stringify` pipe?

**Answer**:  Passing JSON string through `JSON.parse JSON.stringify` pipe will remove newline.

See:

- commit: [9989a4c](https://github.com/ApolloTang/tutorial--dave-gray-youtube-nodejs/commit/9989a4ca0aaab76338ceed523f96a9bea6f02d3b#diff-50692ff735a711e925db35dd812406afeab353332822fd2aa5ec39cb5d8c2836R21)

- [video 30:09](https://youtu.be/3ZAKY-CDKog?list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&t=1809)



**Before:** passing JSON string through `JSON.parse JSON.stringify` pipe :

```js
const data = await fsPromises.readFile('..../05-web-server-with-nodejs/wf/data/data.json', 'utf8')
console.log('data:', data)
/*
data: [
    {
        "firstname": "Dave",
        "lastname": "Gray"
    },
    {
        "firstname": "John",
        "lastname": "Smith"
    }
]
*/
```

Showing `\n` :

```js
const dataShowNewline = data.replace(/\n/g, '\\n')
console.log('dataShowNewline:', dataShowNewline)
/*
dataShowNewline: [\n    {\n        "firstname": "Dave",\n        "lastname": "Gray"\n    },\n    {\n        "firstname": "John",\n        "lastname": "Smith"\n    }\n]
*/
```

**After** passing JSON string through `JSON.parse JSON.stringify` pipe :

```js
const dataAfterParse = JSON.stringify(JSON.parse(data))
console.log('dataAfterParse:', dataAfterParse)
/*
[{"firstname":"Dave","lastname":"Gray"},{"firstname":"John","lastname":"Smith"}]
*/
```

Showing `\n` :

```js
const dataAfterParseShowNewLine =  dataAfterParse.replace(/\n/g, '\\n')
console.log('dataAfterParseShowNewLine:', dataAfterParseShowNewLine)
/*
dataAfterParseShowNewLine: [{"firstname":"Dave","lastname":"Gray"},{"firstname":"John","lastname":"Smith"}]
*/
```
