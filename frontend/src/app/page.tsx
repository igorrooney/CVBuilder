"use client"

import { useEffect, useState } from 'react';
import { fetchCVs } from '../services/api';

type cvc = {
    id: number;
    firstName: string;
    lastName: string;
};

export default function Home() {
    const [cvs, setCvs] = useState<cvc[]>([]);

    useEffect(() => {
        fetchCVs()
            .then(data => setCvs(data))
            .catch(error => console.error("API Error:", error));
    }, []);

    return (
        <div>
            <h1>My CVs</h1>
            <ul>
                {cvs.map((cv) => (
                    <li key={cv.id}>{cv.firstName} {cv.lastName}</li>
                ))}
            </ul>
        </div>
    );
}
