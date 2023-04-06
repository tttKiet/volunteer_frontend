import { useEffect, useState } from 'react';
// Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import ChartDataLabels from 'chartjs-plugin-datalabels';
// services

// scss
import styles from './PostChart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

ChartJS.register(ChartDataLabels, ArcElement, Tooltip, Legend);
function PostChart({ year = new Date().getFullYear() - 1 }) {
    const [dataPost, setDataPost] = useState([12, 19]);
    const data = {
        labels: ['Đóng góp của bạn', 'Tổng số'],

        datasets: [
            {
                label: 'Số bài viết',
                data: [12, 19],
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

    return (
        <div className={cx('wrap')}>
            <div className={cx('map')}>
                <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
            <h2 className={cx('title')}>Biểu đồ thống kê sinh viên tham gia / đăng ký tình nguyện ở năm {year}</h2>
        </div>
    );
}

export default PostChart;
