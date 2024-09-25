'use client'
import { useEffect } from 'react'

import styles from '../css/UserApply.module.css'

export default function UserApply(){

    useEffect(() => {
        const username = document.querySelector(`.${styles.name}`)
        const tel = document.querySelector(`.${styles.tel}`)
    
        const sendMailCheckBox = document.querySelector('#message')
        const personalInfo = document.querySelector('#personal')
    
        const applyBtn = document.querySelector(`.${styles.apply}`)

        const submit = () => {

            if(personalInfo.checked){
                let data = {
                    username : username.value,
                    tel : tel.value,
                    sendMail : sendMailCheckBox.checked,
                    personal : personalInfo.checked
                }
                
                document.querySelector('#Modal').style.display = 'flex'
    
                fetch('https://stac-nine.vercel.app/api/addUser',{
                    method : 'POST',
                    body : JSON.stringify(data)
                })
                .then((response) => {
                    if(response.ok) return response.json()
                })
                .then((data) => {
                    document.querySelector('#Modal').style.display = 'none'
                    alert(data.msg)
                })
            }else{
                return alert("개인정보 수집 및 이용에 동의해주세요..!!!")
            }
        }

        applyBtn.addEventListener('click', submit)

        return () => {
            applyBtn.removeEventListener('click', submit)
        }

    },[])

    return (
        <main className={styles.main}>
            <div id="Modal" className={styles.modal}>
                등록 중...
            </div>
            <div className={styles.title_wrap}>
                <div className={styles.title}>서비스 사전신청</div>
                <div className={styles.boon}>사전신청시 베타버전 사용 및 포인트 혜택이 제공됩니다.</div>
            </div>
            <div className={styles.information}>
                <div className={`${styles.inputWrap}`}><input className={`${styles.input} ${styles.name}`} placeholder='이름을 입력해주세요'/></div>
                <div className={`${styles.inputWrap}`}><input className={`${styles.input} ${styles.tel}`} placeholder='연락처를 - 포함해서 입력해주세요'/></div>
            </div>

            <div className={styles.agree}>
                <div className={styles.agree_input_wrap}>
                    <input className={styles.agree_input } type='checkbox' id="message"/>
                    <label className={styles.label} htmlFor='message'></label>메신저 수신(선택)
                </div>
                <div className={styles.agree_input_wrap}>
                    <input className={styles.agree_input } type='checkbox' id="personal"/>
                    <label className={styles.label} htmlFor='personal'></label>개인정보 수집 및 이용동의
                </div>
            </div>
            <div className={styles.applyWrap}>
                <div className={styles.apply}>신청확인</div>
            </div>
        </main>
    )
}