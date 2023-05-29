import React from 'react';
import styles from '../homepage.module.scss';

export default function Home1Page() {
  return (
    <div>
      <div className={styles.font_container}>
        <span>默认字体</span>
        <p>这是一段文字 ABCD abcd</p>
        <span>Roboto-Regular</span>
        <p className={styles.font_p}>这是一段文字 ABCD abcd</p>
        <span>Menlo-Regular</span>
        <p className={styles.font_menlo}>这是一段文字 ABCD abcd</p>
        <span>HanYiZhengYuan75</span>
        <p style={{ fontFamily: 'HanYiZhengYuan75' }}>这是一段文字 ABCD abcd</p>
      </div>
    </div>
  );
}
