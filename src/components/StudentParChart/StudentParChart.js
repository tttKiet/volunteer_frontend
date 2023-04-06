// Chart
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// services
import { workServices } from '~/services';

// scss
import styles from './StudentParChart.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
const cx = classNames.bind(styles);

ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function StudentParChart({ year = new Date().getFullYear() - 1 }) {
    const [dataPar, setDataPar] = useState([]);
    const [dataReq, setDataReq] = useState([]);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: `Biểu đồ thống kê sinh viên tham gia / đăng ký tình nguyện ở năm ${year}`,
                font: {
                    size: 20,
                },
            },
            datalabels: {
                align: function (context) {
                    var index = context.dataIndex;
                    var curr = context.dataset.data[index];
                    var prev = context.dataset.data[index - 1];
                    var next = context.dataset.data[index + 1];
                    return prev < curr && next < curr ? 'end' : prev > curr && next > curr ? 'start' : 'center';
                },
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(128, 128, 128, 0.7)',
                borderRadius: 4,
                borderWidth: 1,
                color: function (context) {
                    var i = context.dataIndex;
                    var value = context.dataset.data[i];
                    var prev = context.dataset.data[i - 1];
                    var diff = prev !== undefined ? value - prev : 0;
                    return diff < 0 ? 'red' : diff > 0 ? 'blue' : 'gray';
                },
                font: {
                    size: 11,
                    weight: 'bold',
                },
                offset: 8,
                formatter: function (value, context) {
                    var i = context.dataIndex;
                    var prev = context.dataset.data[i - 1];
                    var diff = prev !== undefined ? prev - value : 0;
                    var glyph = diff < 0 ? '▲' : diff > 0 ? '▼' : '◆';
                    return glyph + ' ' + Math.round(value);
                },
                padding: 6,
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const labels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Sinh viên tham gia',
                data: [...dataPar],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                font: {
                    size: 20,
                },
            },
            {
                label: 'Sinh viên đăng ký vượt quá giới hạn nhưng không được duyệt',
                data: [...dataReq],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        const getData = async () => {
            const res = await workServices.getStatisticalStudenParAndReq({ year });
            if (res.errCode === 0) {
                setDataPar(res.data.Par);
                setDataReq(res.data.Req);
            }
        };
        getData();
    }, [year]);
    return (
        <div className={cx('wrap')}>
            <div className={cx('map')}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export default StudentParChart;
