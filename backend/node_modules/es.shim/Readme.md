![module info](https://nodei.co/npm/es.shim.png?downloads=true&downloadRank=true&stars=true)

# es.shim
> `es.shim` is an extend module for letting you can use some future api in current Node.js version.
> Also some useful api for you.


+ Obejct
  * empty()

+ Obejct.prototype
  * merge()


+ Array.prototype
  * includes()



+ Date
  * isDate()


+ Date.prototype
  * getFullWeek()
  * getWeek()
  * format()


+ String.prototype
  * splice()
  * htmlspecialchars()
  * tohtml()
  * xss()
  * escape()
  * padStart()
  * padEnd()


+ Number
  * parse()

    


## Usage

### 1. Object.prototype.merge()
```javascript
let obj1 = {a: 123, b: 456}
let obj2 = {a: 22, c: 44}
let obj3 = {c: 11, e: 55}

o1.merge(o2)
// now obj1 is {a: 22, b: 456, c: 44}
// nothing to obj2 

o1.merge(o2, o3)
// obj1 will be {a: 22, b: 456, c: 11, e: 55}
// nothing to obj2 & obj3

```

### 2. Object.empty()
```javascript
Object.empty({}) // true
Object.empty({a: 213}) // false
Object.empty([]) // true
Object.empty([null]) // false
Object.empty([undefined]) // false

```


### 3. Array.prototype.includes()
```javascript
let arr = [1, '3', 54, 32, 'foo']

arr.includes(1) // true
arr.includes(3) // false
arr.includes('bar') // false
arr.includes('54') // false

```


### 4. Date.isDate()
```javascript

Date.isDate(new Date()) // true
Date.isDate({}) // false
Date.isDate(['bar']) // false
Date.isDate('foo') // false

```


### 5. Date.prototype.format(format)
> `format` can be these below:
> - Y (with century) eg. 1970,2017
> - y (without century) eg. 70, 117
> - m month, 01-12
> - n month, 1-12
> - d date, 01-31
> - j date, 1-31
> - H hours 00-23
> - h hours 00-12
> - G hours 0-23
> - g hours 0-12
> - i minutes, 00-59
> - s seconds, 00-59
> - W how many weeks from 01-01 this year
> - w how many weeks from 01 this month
> - D week name, like Mon, Tue, Wed, Thu, Fri, Sat, Sun

```javascript

new Date().format() // default 2017-02-08 12:11:23
new Date().format('Y-m-d') // 2017-02-08
new Date().format('Y/n/j') // 2017/2/8
new Date().format('Y年n月j日 第W周') // 2017年2月10日 第6周
new Date('Wed Feb 10 2016 23:34:04 GMT+0800 (CST)').format() // 2016-02-10 23:34:04
new Date('2016-08-10T13:14:44.000Z').format() //2016-08-10 21:14:44
new Date(1470834884000).format('') //2016-08-10 21:14:44

```


### 6. String.prototype.splice(start, len[, fill])
- start `<Integer>`
- len `<Integer>`
- fill `<String>`

```javascript
let str = 'Hello baby';

str.splice(0, 5) // return  ' baby'
console.log(str) // nothing tostr, so it return 'Hello baby'

str.splice(0, 5, 'Love') //return 'Love baby'

str.splice(6, 0, 'world, ')// return 'Hello world, baby'

str = str.splice(6) //return  'Holle '

```


### 7. String.prototype.htmlspecialchars([sign])
> Just like php's function - `htmlspecialchars`
- sign `<String>` (ENT_QUOTES/ENT_NOQUOTES)

```javascript
let str = `<script>alert('hello world')</script>`

str.htmlspecialchars() // &lt;script&gt;alert('hello world')&lt;/script&gt;
str.htmlspecialchars('ENT_QUOTES') // &lt;script&gt;alert(&#39;hello world&#39;)&lt;/script&gt;

```


### 8. String.prototype.tohtml()
```javascript
let str = `&lt;script&gt;alert(&#39;hello world&#39;)&lt;/script&gt;`
str.tohtml() // <script>alert('hello world')</script>

```
