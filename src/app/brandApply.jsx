'use client'
import { useEffect } from 'react'
import styles from '../css/BrandApply.module.css'

export default function BrandApply() {

    let brand_type = 'normal_brand'

    useEffect(()=>{

        const brandNameInput = document.querySelector(`.${styles.input_brand}`)
        const telInput = document.querySelector(`.${styles.tel}`)
        const emailInput = document.querySelector(`.${styles.email}`)
        const productUrl1Input = document.querySelector(`.${styles.product_url_1}`)
        const productUrl2Input = document.querySelector(`.${styles.product_url_2}`)

        const normal_brand = document.querySelector(`.${styles.normal_brand}`)
        const eco_brand = document.querySelector(`.${styles.eco_brand}`)

        const personalInfoCheckBox = document.querySelector(`#personal`)

        const applyBtn = document.querySelector(`.${styles.apply}`)
        const toNormalBrand = () => {
            console.log("To Normal : ", brand_type)
            eco_brand.classList.remove(`${styles.selected}`);
            normal_brand.classList.add(`${styles.selected}`);
            brand_type= 'normal_brand'
            
            console.log("To Normal : ", brand_type)
        }

        const toEcoBrand = () => {
            
            console.log("To Eco : ", brand_type)
            normal_brand.classList.remove(`${styles.selected}`);
            eco_brand.classList.add(`${styles.selected}`);
            brand_type = 'eco_brand'
            
            console.log("To Eco : ", brand_type)
        }

        const submit = () => {
            if(personalInfoCheckBox.checked){

                let data = {
                    brand_name : brandNameInput.value,
                    brand_type : brand_type,
                    tel : telInput.value,
                    email : emailInput.value,
                    productUrl1 : productUrl1Input.value,
                    productUrl2 : productUrl2Input.value,
                    sendMail : document.querySelector(`#message`).checked,
                    personal : personalInfoCheckBox.checked,
                }

                document.querySelector('#Modal').style.display = 'flex'
    
                fetch('https://stac-nine.vercel.app/api/addBrand', {
                    method : 'POST',
                    body : JSON.stringify(data)
                })
                .then((response) => {
                    if(response.ok){
                        return response.json()
                    }
                })
                .then((data) => {
                    document.querySelector('#Modal').style.display = 'none'
                    alert(data.msg)
                })
            }else{
                alert('개인정보 수집 및 이용에 동의해주세요.!!')
            }
        }

        normal_brand.addEventListener('click', toNormalBrand)
        eco_brand.addEventListener('click', toEcoBrand)
        applyBtn.addEventListener('click', submit)

        return () => {
            normal_brand.removeEventListener('click', toNormalBrand)
            eco_brand.removeEventListener('click', toEcoBrand)
            applyBtn.removeEventListener('click', submit)
         }

    },[])

    return (
        <div className={styles.main}>
            <div id="Modal" className={styles.modal}>
                등록 중...
            </div>
            <div className={styles.page}>
                <div className={styles.title_wrap}>
                    <div className={styles.title}>브랜드 입점 신청</div>
                    <div className={styles.boon}>브랜드 사전 입점시 다양한 혜택이 제공될 예정입니다</div>
                </div>
                <div className={styles.brand_name}>
                    <input className={`${styles.input} ${styles.input_brand}`} id="brand_name" placeholder='브랜드명을 입력해주세요'/>
                </div>
                <div className={styles.select_brand_type}>
                    <div className={`${styles.brand} ${styles.normal_brand} ${styles.selected}`} id='normal_brand'>일반브랜드</div>
                    <div className={`${styles.brand} ${styles.eco_brand}`} id='eco_brand'>환경브랜드</div>
                </div>

                <div className={styles.show_policy}>
                    <input type='checkbox' className={styles.policy_checkbox} id="checkBox"/>
                    <label htmlFor='checkBox' className={styles.policy_label}>
                        <div className={styles.check}>입점기준 확인하기</div>
                        <div className={styles.arrow}></div>
                    </label>
                    <div className={styles.policy}>
                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>1. 업사이클링 제품 판매</div>
                            <div className={`${styles.policy_detail_content}`}>
                                유저의 안 쓰는 물품 및 버려져 폐기되는 재료로<br />
                                새로운 상품 제작을 주로 하는 브랜드에 한함.
                            </div>
                        </div>

                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>2. 슬로우패션 브랜드</div>
                            <div className={`${styles.policy_detail_content}`}>
                                슬로우 패션 브랜드는 샛별의 4가지 윤리기준인 <br />
                                공정 무역 , 지속 가능 원료, 리사이클·업사이클 원료,<br /> 
                                비건에 맞추어 제작된 제품에 한함. <br />
                                <br />
                                이외의 지속가능한 · 환경적으로 브랜드를 만들어나갈<br />
                                독창적인 방법이 있을시 별도 입점 가능함.<br />
                                <br />
                                모든 슬로우패션 브랜드는 브랜드 상품 및 운영방식이<br />
                                가지는 가치를 필수로 기입해야함.
                            </div>
                        </div>

                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>3. 제작과정에서 환경을 보호하는 제품 판매</div>
                            <div className={`${styles.policy_detail_content}`}>
                            제작과정중 저탄소, 친환경 인증 등 인증마크를 받거나<br />
                            제작과정중 환경보호를 인증할 수 있는 브랜드에 한함.<br />
                            <br />
                            브랜드 상품이 제작과정에서 환경을 보호한다는 가치를<br />
                            필수적으로 명시해야함. <br />
                            </div>
                        </div>

                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>4. 환경을 생각한 패키징</div>
                            <div className={`${styles.policy_detail_content}`}>
                            재활용이 용이한 패키징 및 일회용품을 사용하지 않은<br />
                            최소한의 패키징 등 환경에 도움이 되는 패키징에 한함.<br />
                            <br />
                            재활용 방법 등을 상세페이지나 제품에 명시해야함.<br />
                            </div>
                        </div>

                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>5. 일회용품 대체품</div>
                            <div className={`${styles.policy_detail_content}`}>
                            </div>
                        </div>

                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>6. 제로웨이스트 상품</div>
                            <div className={`${styles.policy_detail_content}`}>
                            </div>
                        </div>

                        <div className={`${styles.policy_detail} ${styles.policy_detail_1}`}>
                            <div className={`${styles.policy_detail_title}`}>7. 세컨핸즈, 구제의류 상품</div>
                            <div className={`${styles.policy_detail_content}`}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.information}>
                    <div className={`${styles.inputWrap}`}><input className={`${styles.input} ${styles.tel}`} placeholder='연락처를 - 포함해서 입력해주세요' type="tel" pattern='(010)-\d{3,4}-\d{4}'/></div>
                    <div className={`${styles.inputWrap}`}><input className={`${styles.input} ${styles.email}`} placeholder='이메일를 입력해주세요' type="email" pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'/></div>
                    <div className={`${styles.inputWrap}`}><input className={`${styles.input} ${styles.product_url_1}`} placeholder='상품 상세페이지 URL (1)' type="url" pattern='https?://.+'/></div>
                    <div className={`${styles.inputWrap}`}><input className={`${styles.input} ${styles.product_url_2}`} placeholder='상품 상세페이지 URL (2)' type="url" pattern='https?://.+'/></div>
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
                <div className={styles.noticeWrap}>
                    <p className={styles.notice}>상품페이지는 IR 피칭의 자료로 사용될 수 있습니다</p>
                </div>
                <div className={styles.applyWrap}>
                    <div className={styles.apply}>신청확인</div>
                </div>
            </div>
        </div>
    )
}