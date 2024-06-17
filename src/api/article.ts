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
    category: string,
    created_at: string,
    updated_at: string,
}

export interface DetailArticleData {
    article_id: number,
    title: string,
    image_url: string,
    content: string,
    category: string,
    cause: string
    symptoms: Array<string>
    preventions: Array<string>
    treatments: TreatmentData
    created_at: string,
    updated_at: string,
}

interface ResponseAllArticles{
    data: Array<SimpleArticleData>
}

interface ResponseArticle{
    data: DetailArticleData
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

export {getAllArticles, getArticle}