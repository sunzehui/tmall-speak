

module.exports = function getContentType(path){
    const FileExtension = path.split('.').pop()
    let ret = '';
    switch (FileExtension)
    {
        case 'html':
            ret = 'text/html'
            break;
        case 'jpg':
            ret ='application/x-jpg'
            break
        case 'gif':
            ret ='image/gif'
            break
        case 'css':
            ret ='text/css'
            break
        case 'js':
            ret ='application/x-javascript'
            break
        case 'png':
            ret ='image/png'
            break
        case 'mp4':
            ret ='video/mpeg4'
            break
    }
    return ret;
};
