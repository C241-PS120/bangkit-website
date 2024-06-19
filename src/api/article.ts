// import axiosInstance from "./axiosInstance";

import axios from "axios";

export interface TreatmentData{
    chemical?: string,
    organic?: string,
}

export interface SimpleArticleData {
    article_id: number,
    title: string,
    image_url: string,
    content: string,
    created_at: string,
    updated_at: string,
    disease: string
}

export interface DetailArticleData {
    article_id: number,
    title: string,
    image_url: string,
    content: string,
    disease: string,
    cause: string,
    label: string,
    symptom_summary: string,
    symptoms: Array<string>
    preventions: Array<string>
    treatments: TreatmentData,
    plants: Array<string>,
    created_at: string,
    updated_at: string,
}

interface ResponseAllArticles{
    data: Array<SimpleArticleData>
}

interface ResponseArticle{
    data: DetailArticleData
}

interface ResponseCreateArticle{
    success: string,
    message?: string,
    error?: string,
}

const axiosInstance = axios.create({
    baseURL: "https://article-service-ldfuyzfodq-et.a.run.app/api/v1",
  });

async function getAllArticles(): Promise<ResponseAllArticles>{
    const response = await axiosInstance.get("/articles")
    const resData = <ResponseAllArticles>response.data

    return resData
}

async function getArticle(id: number): Promise<ResponseArticle>{
    const response = await axiosInstance.get("/articles/" + id)
    const resData = <ResponseArticle>response.data

    return resData
}

async function createArticle(formData: FormData): Promise<ResponseCreateArticle> {
    const response = await axiosInstance.post("/articles", formData, {headers: { "Content-Type": "multipart/form-data" }})
    const resData = <ResponseCreateArticle>response.data
    return resData 
}

async function deleteArticle(id: number): Promise<ResponseCreateArticle> {
    const response = await axiosInstance.delete("/articles/" + id)
    const resData = <ResponseCreateArticle>response.data
    return resData 
}

export {getAllArticles, getArticle, createArticle, deleteArticle}