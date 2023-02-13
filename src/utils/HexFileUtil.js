/*
 * @Author: your name
 * @Date: 2021-09-08 16:12:49
 * @LastEditTime: 2021-09-08 16:52:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-mobile/src/utils/HexFileUtil.js
 */
const FileUtils = {};

FileUtils.block_size = 16;
FileUtils.buffer_size = 1024 * 64 *FileUtils.block_size ;

FileUtils.readBytes = function(file, from, to, done) {
    // TODO: check for filereadersync for mozilla
    //var reader = new FileReaderSync() || new FileReader();
    var reader = new FileReader();
    //if (reader instanceof FileReaderSync) {
    //    var blob = file.slice(from, to);
    //    var result = reader.readAsArrayBuffer(blob);
    //    return new Uint8Array(result);
    //}
    reader.onload = (function(f) {
        var blob = f.slice(from, to);
        reader.readAsArrayBuffer(blob);
    
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) {
                done(new Uint8Array(evt.target.result));
            }
        }
    })(file);
}

FileUtils.readNextBytes = function(file, from, to, callback) {
    //console.log(from);
    //console.log(to);
    if (to < file.size) {
        FileUtils.readBytes(file, from, to, function(result) {
            callback(result);
            FileUtils.readNextBytes(file, from + FileUtils.buffer_size, (to+FileUtils.buffer_size) /*< file.size ? to+FileUtils.buffer_size : file.size*/, callback);
        });
    } else {
        FileUtils.readBytes(file, from, file.size, function(result) {
        callback(result);
        console.log("finished!");
    });
  }
}

FileUtils.zeroFill = function( number, width ) {
    width -= number.toString().length;
    if ( width > 0 ) {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

FileUtils.toHex = function(array) {
    var hex = '';
    for (var j = 0; j < array.length; j++) {
      hex += FileUtils.zeroFill(array[j].toString(16), 2);
    }
    return hex;
 }
 
FileUtils.toByteArray = function(hex) {
    var size = hex.length/2;
    var bytes = new Uint8Array(size);
    for (var j = 0; j < size; j++) {
      bytes[j] = parseInt(hex.substr(j*2, 2), 16);
    }
    return bytes;
 }
 
FileUtils.base64ToByteArray = function(data) {
    var decoded = atob(data);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
    }
    
    return bytes;
}

export default FileUtils;