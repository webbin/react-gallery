import React from 'react';
import RentData from '../../assets/rent_data.json';

export default function RentPage() {
  return (
    <div>
      {RentData.map((item, index) => {
        const [content] = item;
        const imgs = item.slice(1);
        return (
          <div key={index}>
            <span>{content}</span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {imgs.map((url) => {
                const lastIndex = url.lastIndexOf('/');
                const u =
                  url.substring(0, lastIndex) + '/0?wx_fmt=jpeg&wxfrom=16';
                return (
                  <img
                    src={u}
                    key={url}
                    style={{ flex: 1 }}
                    alt="图片"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    datatype=""
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
