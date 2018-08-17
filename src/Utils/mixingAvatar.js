

/**
 * 多张图片制作微信群聊组合头像
 * @param {Array} data 图片集合【】
 */
function groupPicture(data) {
    //return new Promise((resolve, reject) => {
    let base64 = [];
    var c = document.createElement('canvas'),
    ctx = c.getContext('2d'),
    len = data.length;
    c.width = 38;
    c.height = 38;
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = '#fff';
    ctx.fill();
    // 循环把图片放入canvas
    function drawing(n) {
        if (n < len) {
            var img = new Image;
            //img.crossOrigin = 'Anonymous'; //解决跨域
            img.src = data[n];
            // 根据群成员人数，创建不同群图片
            if (len === 2 ) {
                if (n === 0) {
                    ctx.drawImage(img, 0, 0, 19, 19);
                } else if (n === 1) {
                    ctx.drawImage(img, 19, 19, 19, 19);
                }
            } else if (len === 3) {
                if (n === 0) {
                    ctx.drawImage(img, 9, 0, 19, 19);
                } else if (n === 1) {
                    ctx.drawImage(img, 0, 19, 19, 19);
                } else if (n === 2) {
                    ctx.drawImage(img, 19, 19, 19, 19);
                }
            } else if (len === 4) {
                if (n === 0) {
                    ctx.drawImage(img, 0, 0, 19, 19);
                } else if (n === 1) {
                    ctx.drawImage(img, 19, 0, 19, 19);
                } else if (n === 2) {
                    ctx.drawImage(img, 0, 19, 19, 19);
                } else if (n === 3) {
                    ctx.drawImage(img, 19, 19, 19, 19);
                }
            }          
            drawing(n + 1); //递归
            
        } else {
            //保存生成作品图片
            base64.push(c.toDataURL("image/png"));
            //alert(JSON.stringify(base64));
        }
    }
    drawing(0);
    return base64[0];
}