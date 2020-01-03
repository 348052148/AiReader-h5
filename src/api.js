import axios from 'axios'
var host = 'https://api.rbxgg.cn';
//var host = 'http://127.0.0.1:8000';
class Api {
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
    getBook(bookId, sucessFn) {
        return axios.get(host + '/api/book/' + bookId)
            .then(function (response) {
                sucessFn(response)
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
    getBookShelf(userId, sucessFn) {
        return axios.get(host + '/api/user/' + userId + '/bookshelf')
            .then(function (response) {
                sucessFn(response)
            })
    }
    addBookIntoBookShelf(userId, bookId, sucessFn) {
        return axios.post(host + '/api/user/' + userId + '/bookshelf/' + bookId, {
            readNum: 0,
            readOffset: 0
        }).then(function (response) {
            sucessFn(response)
        })
    }
    removeBooksFromBookShelf(userId, bookIds, sucessFn) {
        return axios.delete(host + '/api/user/' + userId + '/bookshelf/books/'+ bookIds.join(','))
        .then(function (response) {
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
        return axios.post(host + '/api/user/' + phoneNumber + '/token', {
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
        return axios.get(host + '/api/user/' + phoneNumber + '/token?password=' + password)
            .then(function (response) {
                sucessFn(response)
            })
    }
    sendValidCode(phoneNumber, sucessFn) {
        return axios.post(host + '/api/user/' + phoneNumber + '/sms/code', { a: 1 })
            .then(function (response) {
                sucessFn(response)
            })
    }
}

export default new Api()
