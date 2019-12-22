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
    getBooks(attr,page, sucessFn) {
        return axios.get(host + '/api/book/search?attr='+attr+'&page=' + page)
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
    getBookChapters(bookId, sucessFn){
        //book/bc688ee6e68f9209d1153bfabd861537/chapters
        return axios.get(host + '/api/book/'+bookId+'/chapters')
            .then(function (response) {
                sucessFn(response)
            })
    }
    getClassifys(sucessFn){
        return axios.get(host + '/api/classify/menus')
        .then(function (response) {
            sucessFn(response)
        })
    }
}

export default new Api()
