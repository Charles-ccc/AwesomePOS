const isPro = Object.is(process.env.NODE_ENV,'production')
module.exports = {
    baseUrl: isPro ?'http://jspang.com/':'/'
}