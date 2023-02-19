import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import img1 from '../../assets/images/bg-post-1.jpg';
import img2 from '../../assets/images/bg-post-2.jpg';
import img3 from '../../assets/images/bg-post-3.jpg';
import img4 from '../../assets/images/bg-post-4.jpg';
import img5 from '../../assets/images/bg-post-5.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './ModalUpPost.module.scss';
import ImageSmall from '../ImageSmall';
import { useState } from 'react';

const cx = classNames.bind(style);
const smallImage = [
    {
        type: 'img1',
        id: img1,
    },
    {
        type: 'img2',
        id: img2,
    },
    {
        type: 'img3',
        id: img3,
    },
    {
        type: 'img4',
        id: img4,
    },
    {
        type: 'img5',
        id: img5,
    },
];

const obImgS = {
    img1,
    img2,
    img3,
    img4,
    img5,
};

function ModalUpPost({ isShow, toggleShow }) {
    const [img, setImg] = useState(img5);
    const [isShowDecs, setIsShowDecs] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    const handleClickImgSmall = (type) => {
        setImg(obImgS[type]);
        setName('');
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setName(file.name);
            setImg(url);
            setFile(file);
        }
    };

    const handleClickContinue = () => {
        setIsShowDecs(true);
    };

    const handleClickUpPost = () => {
        console.log('uo post clicked');
    };

    return (
        <div
            className={cx('wrap', {
                show: isShow,
            })}
        >
            <div className={cx('form')}>
                <h1 className={cx('header')}>
                    Tạo bài viết mới
                    <div className={cx('x')} onClick={toggleShow}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </h1>
                <hr />
                <div className={cx('main')}>
                    <div className={cx('main-image')}>
                        <div className={cx('image')} style={{ backgroundImage: `url(${img})` }}>
                            {isShowDecs ? (
                                <></>
                            ) : (
                                <div className={cx('image-component')}>
                                    {smallImage.map((img, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleClickImgSmall(img.type)}
                                            style={{ display: 'inline-block', marginRight: '12px' }}
                                        >
                                            <ImageSmall src={img.id} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {isShowDecs ? (
                            <></>
                        ) : (
                            <div className={cx('file')}>
                                <label htmlFor="file">
                                    Chọn ảnh từ thư viện cá nhân
                                    <FontAwesomeIcon className={cx('icon')} icon={faFileAlt} />
                                    {name && <span className={cx('name')}>{name}</span>}
                                </label>
                                <input id="file" type="file" onChange={handleChangeFile}></input>
                            </div>
                        )}
                    </div>
                    <div
                        className={cx('main-decs', {
                            show: isShowDecs,
                        })}
                    >
                        <div className={cx('info')}>
                            <img src={img5}></img>
                            <span>b2014754</span>
                        </div>

                        <div className={cx('content')}>
                            <textarea name="decsription" placeholder="Nội dung ..."></textarea>
                        </div>
                        <hr />
                        <div className={cx('main-footer')}>
                            <b>Lưu ý:</b>
                            <ul>
                                <li>Nội dung bài viết phải đúng thuần phong mỹ tục.</li>
                                <li>Cần thêm ảnh cụ thể đánh bài viết thêm tính thuyết phục.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    {!isShowDecs ? (
                        <button type="button" className={cx('submit')} onClick={handleClickContinue}>
                            Tiếp tục
                        </button>
                    ) : (
                        <button type="button" className={cx('submit')} onClick={handleClickUpPost}>
                            Đăng
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalUpPost;
