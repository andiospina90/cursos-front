import React from 'react'
import { useState, useEffect } from 'react';
import { getTopThreeCourses } from '../../api/Courses/Course';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const Home = () => {

    const [topThreeCourses, settopThreeCourses] = useState([]);

    useEffect(() => {
        fetchTopThreeCourses();
    }, []);

    useEffect(() => {
        console.log(topThreeCourses);
    }, [topThreeCourses])


    const fetchTopThreeCourses = async () => {
        try {
            const topThreeCourses = await getTopThreeCourses();
            settopThreeCourses(topThreeCourses.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div>
        <h1>Bienvenido</h1>
        <Card variant="outlined">
            <CardHeader title="Top 3 Cursos" />
            <CardContent sx={{display:'flex'}}>
                <BarChart
                    width={1500}
                    height={600}
                    data={topThreeCourses}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course_name" />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </CardContent>
        </Card>
    </div>
    )
}

export default Home