"use client"

import axios from "axios";
import { useState } from 'react'

type RequestOptions = {
    body?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, string | number | undefined>;
    apiKey?: string;
};

export default function useRequestData(){
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<any>(null);
const [error, setError] = useState(false);

const makeRequest = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
    options: RequestOptions = {}
) => {
    const { body = null, headers = {}, params = {}, apiKey = null } = options;

    setIsLoading(true);
    setError(false)

    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4444";
        const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

        const response = await axios({
            method,
            url: fullUrl,
            headers: {
                ...headers,
                ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
            },
            params,
            data: body,
        });

        setData(response.data);
        return response.data;
    } catch (err) {
        console.error("API fejl:", err);
        setError(true);
        setData(null);
        return null;
    } finally {
        setIsLoading(false);
    }

    };
        return { makeRequest, data, isLoading, error };
}