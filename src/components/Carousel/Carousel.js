import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import styles from './Carousel.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Slide({ imgItems }) {
    return (
        <Carousel className={cx('wrap')}>
            {imgItems.map((img, index) => (
                <Carousel.Item key={index + 'carousel'} interval={2000}>
                    <Image className={cx('d-block', 'img')} src={img.link} alt={img.alt} />
                    <Carousel.Caption>
                        <h3>{img.title}</h3>
                        <p>{img.content}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slide;
