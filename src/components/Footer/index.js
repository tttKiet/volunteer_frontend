import { Container, Row, Col } from 'react-bootstrap';
import { UilFacebookF } from '@iconscout/react-unicons';
import { UilInstagram } from '@iconscout/react-unicons';
import { UilMapMarker } from '@iconscout/react-unicons';
import { UilEnvelopeAdd } from '@iconscout/react-unicons';
import { UilPhone } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrap')}>
            <hr />

            <Container>
                <div className={cx('bor1')}>
                    <Row>
                        <Col sm={6}>
                            <h2 className={cx('title')}>VOLUNTEER</h2>
                            <div className={cx('decs')}>
                                Volunteers are dedicated, enthusiastic individuals who tirelessly contribute to help
                                communities and society as a whole. From supporting charitable activities, assisting
                                those in need, to protecting the environment and engaging in important social projects,
                                volunteers play a significant role in creating a better world. Therefore, we always
                                respect and appreciate the efforts of volunteers, and hope that we can work together to
                                make a difference.
                            </div>
                            <div className={cx('social')}>
                                <div>
                                    <a href="https://www.facebook.com/kiett01">
                                        <UilFacebookF />
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.instagram.com/__kiet01/">
                                        <UilInstagram />
                                    </a>
                                </div>
                            </div>
                        </Col>

                        <Col sm={2}>
                            <h2 className={cx('title2')}>Company</h2>
                            <ul className={cx('list1')}>
                                <li>About me</li>
                                <li>Experiences</li>
                                <li>Careers</li>
                            </ul>
                        </Col>
                        <Col sm={4} className=" ">
                            {/* <div className={cx('card', 'text-center', 'p-2')}>
                                        <h3 className="mb-3">Trường Đại học Cần Thơ (Can Tho University)</h3>
                                        <p></p>
                                        <p>
                                            Điện thoại: (84-292) 3832663 - (84-292) 3838474; Fax: (84-292) 3838474; Email:
                                            dhct@ctu.edu.vn.
                                        </p>
                                        
                                    </div> */}

                            <h2 className={cx('title2')}>Get in touch</h2>
                            <ul className={cx('list2')}>
                                <li>
                                    <div className={cx('list2-wrap')}>
                                        <div className={cx('list2-icon')}>
                                            <UilMapMarker />
                                        </div>
                                        <div>
                                            <h2 className={cx('title3')}>LOCATION</h2>
                                            <span>
                                                CTU, Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.
                                                (Class: 'DI20V7A3')
                                            </span>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className={cx('list2-wrap')}>
                                        <div className={cx('list2-icon')}>
                                            <UilEnvelopeAdd />
                                        </div>

                                        <div>
                                            <h2 className={cx('title3')}>EMAIL OF ME</h2>
                                            <span>kietb2014754@gmail.com</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className={cx('list2-wrap')}>
                                        <div className={cx('list2-icon')}>
                                            <UilPhone />
                                        </div>
                                        <div>
                                            <h2 className={cx('title3')}>CALL WITH ME</h2>
                                            <span>+0967688854</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className={cx('box2')}>
                    <h3> Copyright &#169; 2023 , All rights reserved. Powered by Bui Tuan Kiet.</h3>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
