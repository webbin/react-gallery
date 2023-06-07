import React from 'react';
import styles from './batterypage.module.scss';

export default function BatteryPage() {
  return (
    <div>
      <div className={styles.upload_button}>
        <input
          className={styles.input}
          type="file"
          onChange={(e) => {
            const { files } = e.target;
            if (files && files.length) {
              const file = files.item(0);
              if (file) {
                console.log('read file: ', file.name);
                console.log('read file size: ', file.size);

                const reader = new FileReader(); // 创建一个FileReader对象

                reader.onload = function (event) {
                  const contents = event.target?.result; // 读取文件内容
                  // alert('文件内容：' + contents);
                  console.log(contents);
                };

                reader.readAsText(file); // 以文本格式读取文件内容
              }
            }
          }}
        />
        <span>点击上传</span>
      </div>
    </div>
  );
}
