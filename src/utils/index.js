export function debounce(func, duration) {
  let timeout;

  return function (...args) {
    const effect = () => {
      timeout = null;
      return func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(effect, duration);
  };
}

export function setItem(key, val) {
  localStorage.setItem(key, val);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

//colorRgba方法也具有颜色减淡功能，通过传递第二个参数（透明度）来侧面实现颜色减淡效果。但不具备颜色加深效果
export function colorRgba(str, n) {
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = str.toLowerCase();
  n = n || 1;
  //十六进制颜色转换为RGB格式
  if (sColor && reg.test(sColor)) {
    let sColorChange = getRgbNum(sColor);
    return "rgba(" + sColorChange.join(",") + "," + n + ")";
  } else {
    return sColor;
  }
}

export function getRgbNum(sColor) {
  if (sColor.length === 4) {
    var sColorNew = "#";
    for (var i = 1; i < 4; i += 1) {
      //补全颜色值 例如：#eee,#fff等
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
    }
    sColor = sColorNew;
  }
  //处理六位颜色值
  var sColorChange = [];
  for (var i = 1; i < 7; i += 2) {
    //核心代码，通过parseInt将十六进制转为十进制，parseInt只有一个参数时是默认转为十进制的，第二个参数则是指定转为对应进制
    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  }
  return sColorChange;
}

export function lightDarkenColor(color, num) {
  let colorArr = getRgbNum(color);
  let sColorChange = [];
  for (var i = 0; i < colorArr.length; i++) {
    let val = colorArr[i] + num;
    if (val < 0) {
      val = 0;
    }
    if (val > 255) {
      val = 255;
    }
    sColorChange.push(val);
  }
  return "rgba(" + sColorChange.join(",") + ",1)";
}
