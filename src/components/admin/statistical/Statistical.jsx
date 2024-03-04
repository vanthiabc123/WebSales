import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, where, count } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Chart from "chart.js/auto"; // Import Chart.js library
import Header from '../header/Header';
const Statistical = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const chartContainer = useRef(null);
    useEffect(() => {
      const chartData = {
        labels: [
          "Sản phẩm",
          "Đơn hàng",
          "Người dùng",
         
        ],
        datasets: [
          {
            label: "Số lượng",
            data: [
              totalProducts,
              totalOrders,
              totalUsers
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
  
      // Destroy the previous chart if it exists
      if (chartContainer.current) {
        if (chartContainer.current.chartInstance) {
          chartContainer.current.chartInstance.destroy();
        }
  
        // Render the new chart
        const newChartInstance = new Chart(chartContainer.current, {
          type: "bar",
          data: chartData,
          options: {
            // Add your chart options here if needed
          },
        });
  
        // Save the chart instance in the ref for future destruction
        chartContainer.current.chartInstance = newChartInstance;
      }
    }, [
      totalProducts,
      totalOrders,
      totalUsers
    ]);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                // Thống kê số lượng sản phẩm
                const productsQuerySnapshot = await getDocs(collection(db, 'products'));
                const productsCount = productsQuerySnapshot.size;
                setTotalProducts(productsCount);

                // Thống kê số lượng đơn hàng
                const ordersQuerySnapshot = await getDocs(collection(db, 'orders'));
                const ordersCount = ordersQuerySnapshot.size;
                setTotalOrders(ordersCount);

                // Thống kê số lượng người dùng
                const usersQuerySnapshot = await getDocs(collection(db, 'users'));
                const usersCount = usersQuerySnapshot.size;
                setTotalUsers(usersCount);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className="container">
          <Header></Header>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Biểu đồ dạng cột</h3>
            </div>
            <div className="card-body">
              <canvas ref={chartContainer}></canvas>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Statistical;
