import { useEffect, useState } from 'react';

// Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// services
import { postServices } from '~/services';

// selection
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

// scss
import styles from './PostChart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

ChartJS.register(ChartDataLabels, ArcElement, Tooltip, Legend);
function PostChart() {
    const currUser = useSelector(userSelector);
    const [dataPost, setDataPost] = useState([0, 1]);
    const data = {
        labels: ['Đóng góp của bạn', 'Người dùng khác'],

        datasets: [
            {
                label: 'Số bài viết',
                data: [...dataPost],
                backgroundColor: ['#864F85', '#b46bb2'],
                borderColor: ['#fff', '#fff'],
                borderWidth: 3,
                datalabels: {
                    labels: {
                        index: {
                            align: 'end',
                            anchor: 'end',
                            color: function (ctx) {
                                return ctx.dataset.backgroundColor;
                            },
                            font: { size: 18 },

                            formatter: (value, ctx) => {
                                const total = dataPost.reduce((total, value) => total + value, 0);
                                return ctx.active ? ((value * 100) / total).toFixed(2) + '%' : '';
                            },
                            offset: 8,
                            opacity: function (ctx) {
                                return ctx.active ? 1 : 0.5;
                            },
                            borderColor: 'white',
                            borderWidth: 2,
                            padding: 4,
                            borderRadius: 4,
                        },

                        value: {
                            align: 'bottom',
                            backgroundColor: function (ctx) {
                                var value = ctx.dataset.data[ctx.dataIndex];
                                return value > 50 ? 'white' : null;
                            },
                            color: function (ctx) {
                                var value = ctx.dataset.data[ctx.dataIndex];
                                return value > 50 ? ctx.dataset.backgroundColor : 'white';
                            },
                            formatter: function (value, ctx) {
                                const total = dataPost.reduce((total, value) => total + value, 0);
                                const result = ((value * 100) / total).toFixed(2) + '%';
                                return ctx.active ? '' : result;
                            },
                        },
                    },
                },
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                },
                offset: 0,
                padding: 0,
            },
        },
        maintainAspectRatio: false,
        aspectRatio: 1.5,
    };

    useEffect(() => {
        const getStatisticalPost = async () => {
            const res = await postServices.getStatisticalPost({ userId: currUser.id });
            if (res.errCode === 0) {
                setDataPost([res.data[0], res.data[1] - res.data[0]]);
            }
        };

        getStatisticalPost();
    }, [currUser.id]);

    return (
        <div className={cx('wrap')}>
            <div className={cx('map')}>
                <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
            <h2 className={cx('title')}>Biểu đồ thống kê đóng góp bài viết của bạn</h2>
        </div>
    );
}

export default PostChart;
