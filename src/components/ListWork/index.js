import { useEffect, useState } from 'react';
import { workServices } from '~/services';
import { Row } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

import WorkInList from '~/components/WorkInList';
import ToastMassage from '../ToastMassage';

import classNames from 'classnames/bind';
import styles from './ListWork.module.scss';

const cx = classNames.bind(styles);

function ListWork() {
    const currUser = useSelector(userSelector);
    const [work, setWork] = useState([]);
    const [workReg, setWorkReg] = useState([]);

    const [obToast, setObToast] = useState({
        isShow: false,
        header: '',
        content: '',
    });

    const toggleShowToast = () => {
        setObToast((ob) => {
            return {
                isShow: !ob.isShow,
                header: '',
                content: '',
            };
        });
    };

    const registerWork = (res) => {
        if (res.errCode === 0) {
            setObToast(() => {
                return {
                    isShow: true,
                    header: 'Xong',
                    content: res.errMessage,
                };
            });
        }
    };

    const renderWork = async () => {
        console.log('renderWor; currUser.id: ', currUser.id);
        const res = await workServices.getNameWork({ userId: currUser.id });

        if (res.errCode === 0) {
            setWork(res.workNames);
        }
    };

    useEffect(() => {
        const getWorks = async () => {
            const res = await workServices.getNameWork({ userId: currUser.id });

            if (res.errCode === 0) {
                setWork(res.workNames);
            }
        };
        const getWorkUserReg = async () => {
            const res = await workServices.getWorkUserReg({ userId: currUser.id });
            setWorkReg(res.data);
        };
        getWorks();
        getWorkUserReg();
    }, [currUser.id]);
    return (
        <div className={cx('wrap')}>
            <ToastMassage
                handleClose={toggleShowToast}
                isShow={obToast.isShow}
                header={obToast.header}
                content={obToast.content}
            />
            <div>
                <h1 className={cx('title')}> Danh sách tổ chức các công việc cho tình nguyện viên sắp tới</h1>
            </div>

            <div className={cx('main')}>
                <Row className={cx('g-5', 'work-lists')}>
                    {work.map((work, index) => (
                        <WorkInList
                            disable={workReg.includes(work.id)}
                            registerWork={registerWork}
                            key={work.id}
                            workId={work.id}
                            stt={index + 1}
                            name={work.name}
                            startDate={work.startDate}
                            place={work.workPlace}
                            maxStudent={work.maxStudent}
                            curStudent={work.curStudent}
                            pointPlus={work.pointPlus}
                            renderWork={renderWork}
                        />
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default ListWork;
