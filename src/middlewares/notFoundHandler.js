const notFoundHandler = (req, res, next) => {
    console.log(`not found ${req.method} ${req.url}`)
    return res.json({
        status: 401,
        method: req.method,
        path: req.url,
        response: 'Not found'
    })
}
export default notFoundHandler