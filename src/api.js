import axios from 'axios'
import store from 'storejs';
var host = 'https://api.rbxgg.cn';
//var host = 'http://127.0.0.1:8000';
class Api {
    constructor() {
        this.apiToken = store.get('api_token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.apiToken;
        axios.defaults.headers.common['Accept'] = 'application/json';
    }
    setToken(){
        this.apiToken = store.get('api_token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.apiToken;
    }
    getHomeBooks(sucessFn) {
        return axios.get(host + '/api/home/books')
            .then((response) => {
                sucessFn(response)
            })
    }
    getBooks(attr, page, sucessFn) {
        return axios.get(host + '/api/book/search?attr=' + attr + '&page=' + page)
            .then(function (response) {
                sucessFn(response)
            })
    }
    getBook(bookId, sucessFn, catchFn) {
        return axios.get(host + '/api/book/' + bookId)
            .then(function (response) {
                sucessFn(response)
            }).catch(function(){
                catchFn()
            })
    }
    getBookContents(bookId, chapter, sucessFn) {
        return axios.get(host + '/api/book/' + bookId + '/chapter/' + chapter + '/contents')
            .then(function (response) {
                sucessFn(response)
            })
    }
    getBookChapters(bookId, page, sucessFn) {
        //book/bc688ee6e68f9209d1153bfabd861537/chapters
        return axios.get(host + '/api/book/' + bookId + '/chapters?page='+page)
            .then(function (response) {
                sucessFn(response)
            })
    }

    //书架操作
    getBookShelf(sucessFn) {
        return axios.get(host + '/api/bookshelf')
            .then(function (response) {
                sucessFn(response)
            })
    }
    addBookIntoBookShelf( bookId, sucessFn) {
        return axios.post(host + '/api/bookshelf/' + bookId, {
            readNum: 0,
            readOffset: 0
        }).then(function (response) {
            sucessFn(response)
        })
    }
    removeBooksFromBookShelf(bookIds, sucessFn) {
        return axios.delete(host + '/api/bookshelf/books/'+ bookIds.join(','))
        .then(function (response) {
            sucessFn(response)
        })    
    }
    updateBookFromBookShelf(bookId, chapter , sucessFn){
        return axios.put(host + '/api/bookshelf/' + bookId, {
            readNum: chapter,
            readOffset: 0
        }).then(function (response) {
            sucessFn(response)
        })
    }

    getClassifys(sucessFn) {
        return axios.get(host + '/api/classify/menus')
            .then(function (response) {
                sucessFn(response)
            })
    }
    searchBooks(keyword, page, sucessFn) {
        return axios.get(host + '/api/search?keyword=' + keyword + '&page=' + page)
            .then(function (response) {
                sucessFn(response)
            })
    }
    register(phoneNumber, code, password, surePassword, sucessFn) {
        return axios.post(host + '/api/register', {
            phone:phoneNumber,
            code: code,
            password: password,
            repeatPassword: surePassword
        }).then(function (response) {
            sucessFn(response)
        })
    }
    loginByPhoneCode(phoneNumber, code, sucessFn) {
        return axios.post(host + '/api/user/' + phoneNumber + '/login', {
            code: code,
        }).then(function (response) {
            sucessFn(response)
        })
    }
    loginByPassword(phoneNumber, password, sucessFn) {
        return axios.post(host + '/api/login', {
            phone:phoneNumber,
            password:password
        }).then(function (response) {
            sucessFn(response)
        })
    }
    logout(sucessFn) {
        return axios.post(host + '/api/logout', {}).then(function (response) {
            sucessFn(response)
        })
    }
    sendValidCode(phoneNumber, sucessFn) {
        return axios.post(host + '/api/user/' + phoneNumber + '/sms/code', { a: 1 })
            .then(function (response) {
                sucessFn(response)
            })
    }
    getApiToken(sucessFn) {
        return axios.get(host + '/api/api_token')
            .then(function (response) {
                sucessFn(response)
            })
    }
}

export default new Api()
