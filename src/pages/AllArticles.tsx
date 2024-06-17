import "../../public/library/selectric/public/selectric.css";

import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { SimpleArticleData, getAllArticles } from "../api/article";
import { useEffect, useState } from "react";

import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Link } from "react-router-dom";
import useScript from "../hooks/useScript";

const dummyArticle = {
    success: true,
    data: [
        {
            article_id: 1,
            title: "Rust",
            image_url:
                "https://storage.googleapis.com/c241-ps120-article/test1.png",
            content:
                "Rust in coffee is caused by the fungus Hemileia vastatrix. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            category: "Fungal",
            created_at: "2024-06-08T03:39:33Z",
            updated_at: "2024-06-08T03:39:33Z",
        },
        {
            article_id: 2,
            title: "Blight",
            image_url:
                "https://storage.googleapis.com/c241-ps120-article/test2.png",
            content:
                "Blight in tomatoes is caused by the fungus Phytophthora infestans. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            category: "Fungal",
            created_at: "2024-06-08T03:39:33Z",
            updated_at: "2024-06-08T03:39:33Z",
        },
        {
            article_id: 3,
            title: "Mosaic Virus",
            image_url:
                "https://storage.googleapis.com/c241-ps120-article/test3.jpg",
            content:
                "Mosaic virus affects cucumbers causing mottled leaves. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            category: "Viral",
            created_at: "2024-06-08T03:39:33Z",
            updated_at: "2024-06-08T03:39:33Z",
        },
        {
            article_id: 4,
            title: "Leaf Spot",
            image_url:
                "https://storage.googleapis.com/c241-ps120-article/test4.jpg",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            category: "Fungal",
            created_at: "2024-06-08T03:39:33Z",
            updated_at: "2024-06-08T03:39:33Z",
        },
        {
            article_id: 5,
            title: "Healthy Coffe",
            image_url:
                "https://storage.googleapis.com/c241-ps120-article/test5.jpg",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            category: "Nutritional Deficiency",
            created_at: "2024-06-08T03:39:33Z",
            updated_at: "2024-06-13T07:35:51Z",
        }
    ],
};

function AllArticles() {
    const importScript = [
        "/library/selectric/public/jquery.selectric.min.js",
        "/js/page/features-posts.js",
    ];
    useScript(importScript);

    const [article, setArticle] = useState<SimpleArticleData[]>([]);
    const [filter, setFilter] = useState<DataTableFilterMeta>({
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            // const response = await getAllArticles()
            const response = dummyArticle;
            setArticle(response.data);
        }
        if (article.length > 1) {
            setLoading(false);
        } else {
            fetchData();
            setLoading(true);
        }
    }, [article]);

    const titleBodyTemplate = (rowData: SimpleArticleData) => {
        return (
            <>
                {rowData.title}
                <div className="table-links">
                    <Link to={"view/" + rowData.article_id.toString()}>View</Link>
                    <div className="bullet"></div>
                    <Link to={"update/" + rowData.article_id.toString()}>
                        Edit
                    </Link>
                    <div className="bullet"></div>
                    <Link to={""} className="text-danger">
                        Delete
                    </Link>
                </div>
            </>
        );
    };

    const contentBodyTemplate = (rowData: SimpleArticleData) => {
        return <p className="mt-3 mr-3">{rowData.content.replace(/^(.{100}[^\s]*).*/, "$1")}...</p>;
    };

    const createAtBodyTemplate = (rowData: SimpleArticleData) => {
        const date = new Date(rowData.created_at);

        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const year = date.getUTCFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        return <p>{formattedDate}</p>;
    };

    const renderDataTable = () => {
        return (
            <DataTable
                value={article}
                paginator
                rows={5}
                dataKey="article_id"
                stripedRows
                showGridlines
                filters={filter}
                loading={loading}
                globalFilterFields={["title"]}
                emptyMessage="No article found."
                tableStyle={{ maxWidth: "100%"}}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
                <Column
                    field="title"
                    header="Title"
                    style={{ width: "30%", margin: "0.25rem" }}
                    body={titleBodyTemplate}
                />
                <Column
                    field="category"
                    header="Category"
                    style={{ minWidth: "10%", margin: "0.25rem" }}
                />
                <Column
                    field="content"
                    header="Content"
                    style={{ minWidth: "40%", margin: "0.25rem" }}
                    body={contentBodyTemplate}
                />
                <Column
                    field="created_at"
                    header="Create At"
                    style={{ minWidth: "6rem", margin: "0.25rem" }}
                    body={createAtBodyTemplate}
                />
            </DataTable>
        );
    };

    const filterHandler = (value: string) => {
        const _filter = { ...filter };

        // @ts-expect-error type error in primereact
        _filter.title.value = value;

        setFilter(_filter);
    };

    return (
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <h1>Articles</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item">Articles</div>
                    </div>
                </div>
                <div className="section-body">
                    <h2 className="section-title">Articles</h2>
                    <p className="section-lead">
                        You can manage all Articles, such as editing, deleting and
                        more.
                    </p>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>All Articles</h4>
                                </div>
                                <div className="card-body">
                                    <div className="section-header-button float-left">
                                        <Link
                                            to={"create"}
                                            className="btn btn-primary"
                                        >
                                            Add New Article
                                        </Link>
                                    </div>
                                    <div className="float-right">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Article"
                                                onChange={(e) => {
                                                    filterHandler(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="clearfix mb-3"></div>

                                    <div className="mr-2 ml-2 mb-5">
                                        {renderDataTable()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AllArticles;
