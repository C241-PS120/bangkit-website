import { DetailArticleData, TreatmentData, getArticle } from "../api/article";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const initialStateArticle = {
    article_id: 0,
    title: "",
    image_url: "",
    content: "",
    disease: "",
    label: "",
    cause: "",
    symptom_summary: "",
    symptoms: [],
    preventions: [],
    treatments: new Object(),
    plants: [],
    created_at: "",
    updated_at: "",
};

function TreatmentComponent(data: TreatmentData) {
    return (
        <div className="row mb-3">
            {data.chemical ? (
                <>
                    <h5>&#x2022; Dengan Kimia</h5>
                    <div className="col-12">
                        <p>{data.chemical}</p>
                    </div>
                </>
            ) : (
                <></>
            )}
            {data.organic ? (
                <>
                    <h5>&#x2022; Dengan Organik</h5>
                    <div className="col-12">
                        <p>{data.organic}</p>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

function ListComponent(data: Array<string>, key: string) {
    return data.map((_data: string, index: number) => {
        return (
            <li key={`list-${key}-${index}`}>
                <span>{_data}</span>
            </li>
        );
    });
}


function ViewArticle() {
    const navigate = useNavigate();
    const { articleId } = useParams();

    const [article, setArticle] =
        useState<DetailArticleData>(initialStateArticle);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await getArticle(Number(articleId))
            // const response = dummyArticle;
            setArticle(response.data);
        }
        fetchData().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <div className="section-header-back">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                            className="btn btn-icon"
                            style={{ lineHeight: "1.5" }}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </a>
                    </div>
                    <h1>View Article</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item">
                            <Link to="/article">Articles</Link>
                        </div>
                        <div className="breadcrumb-item">View Article</div>
                    </div>
                </div>

                <div className="section-body">
                    <h2 className="section-title">View Article</h2>
                    <p className="section-lead">
                        On this page you can view an Article content.
                    </p>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Article</h4>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className="spinner-border"
                                                role="status"
                                            ></div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="col-12 col-sm-10 mx-auto">
                                                <div className="title row">
                                                    <h2>{article.title}</h2>
                                                </div>
                                                <div className="text-secondary row mb-3">
                                                    <h6>{article.label}</h6>
                                                </div>

                                                <div className="row mb-3">
                                                    <img
                                                        className="rounded card-img-top"
                                                        src={article.image_url}
                                                        alt="article-image"
                                                    />
                                                </div>

                                                <div className="row">
                                                    <h3>Gejala</h3>
                                                    <div className="col-12">
                                                        <ul>
                                                            {ListComponent(
                                                                article.symptoms,
                                                                "symptoms"
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <p>{article.content}</p>
                                                    <p>{article.symptom_summary}</p>
                                                    <p className="text-muted">Disebabkan oleh {article.cause}</p>
                                                </div>

                                                <div className="row mb-3">
                                                    <h3>
                                                        Bagaimana Cara
                                                        Mencegahnya?
                                                    </h3>
                                                    <div className="col-12">
                                                        <ul>
                                                            {ListComponent(
                                                                article.preventions,
                                                                "preventions"
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <h3 className="mb-3">
                                                        Bagaimana Cara
                                                        Mengobatinya?
                                                    </h3>
                                                    <div className="col-12">
                                                        {TreatmentComponent(
                                                            article.treatments
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <h5>
                                                        Tanaman yang terinfeksi
                                                    </h5>
                                                    <div className="col-12">
                                                        <ul>
                                                            {ListComponent(
                                                                article.plants,
                                                                "plant"
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ViewArticle;
