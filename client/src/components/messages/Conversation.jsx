import React from 'react'
import PorfilePicture from '../../assets/defaultUser.png'
import styles from './conversation.module.css';

const Conversation = () => {
  return (
     <div className={styles.message}>
                    <div>
                        <img src={PorfilePicture} alt="" className={styles.img} />
                    </div>
                    <div className={styles.inforamtions}>
                        <h5>hamza mahjboui</h5>
                        <p>message <span>2h</span></p> 
                    </div>
                </div>
          
  )
}

export default Conversation