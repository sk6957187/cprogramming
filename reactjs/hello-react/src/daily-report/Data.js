import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { Table, message } from 'antd';

const SimpleTable = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Define loadData using useCallback before useEffect
    const loadData = useCallback(async () => {
        setLoading(true);
        let response;
        try {
            // Try HTTPS first
            // response = await axios.get("http://jsonplaceholder.typicode.com/comments");
            response = await axios.get("http://localhost:8080/daily-report/view");
            setGridData(formatData(response.data));
        } catch (error) {
            // If HTTPS fails, try HTTP
            if (error.message.includes('ERR_SSL_PROTOCOL_ERROR')) {
                try {
                    response = await axios.get("http://localhost:8080/daily-report/view");
                    // response = await axios.get("http://jsonplaceholder.typicode.com/comments");
                    setGridData(formatData(response.data));
                } catch (httpError) {
                    console.error("Error fetching data:", httpError);
                    message.error("Failed to fetch data from the server.");
                }
            } else {
                console.error("Error fetching data:", error);
                message.error("Failed to fetch data from the server.");
            }
        }
        setLoading(false);
    }, []); // Empty dependency array to keep loadData stable

    // useEffect now safely depends on loadData
    useEffect(() => {
        loadData();
    }, [loadData]);

    const formatData = (data) => {
        // Format data to match the structure of the table
        return data.map((item, index) => ({
            key: index,
            id: item.id,
            date: item.postId,  // Using postId as placeholder for date
            user: item.name,
            type: item.email || "N/A",
            action: item.body,
            category: "N/A",    // Placeholder since the original data doesn't have this field
            completed: "N/A",   // Placeholder
            createdAt: "N/A",   // Placeholder
            updatedAt: "N/A",   // Placeholder
            // key: index, 
            // id: item[0], 
            // date: item[1], 
            // user: item[2], 
            // type: item[3] || "N/A", 
            // action: item[4], 
            // category: item[5], 
            // completed: item[6], 
            // createdAt: item[7], 
            // updatedAt: item[8], 
        }));
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "User", dataIndex: "user", key: "user" },
        { title: "Type", dataIndex: "type", key: "type" },
        { title: "Action", dataIndex: "action", key: "action" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Completed", dataIndex: "completed", key: "completed" },
        { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
        { title: "Updated At", dataIndex: "updatedAt", key: "updatedAt" },
    ];

    return (
        <div>
            <Table 
                columns={columns} 
                dataSource={gridData} 
                loading={loading} 
                pagination={{ pageSize: 10 }} 
            />
        </div>
    );
};

export default SimpleTable;
