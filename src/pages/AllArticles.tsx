import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { SimpleArticleData, deleteArticle, getAllArticles } from "../api/article";
import { useEffect, useRef, useState } from "react";

import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import useScript from "../hooks/useScript";

function AllArticles() {
    useScript("/library/selectric/public/jquery.selectric.min.js");
    useScript("/js/page/features-posts.js");

    const [article, setArticle] = useState<SimpleArticleData[]>([]);
    const [filter, setFilter] = useState<DataTableFilterMeta>({
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await getAllArticles();
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
                    <Link to={"view/" + rowData.article_id.toString()}>
                        View
                    </Link>
                    <div className="bullet"></div>
                    <a
                        onClick={(e) => {
                            e.preventDefault;
                            confirmDialogDelete(rowData.article_id);
                        }}
                        className="text-danger"
                    >
                        Delete
                    </a>
                </div>
            </>
        );
    };

    const contentBodyTemplate = (rowData: SimpleArticleData) => {
        return <p>{rowData.content.replace(/^(.{100}[^\s]*).*/, "$1")}...</p>;
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
                filters={filter}
                loading={loading}
                globalFilterFields={["title"]}
                emptyMessage="No article found."
                tableStyle={{ maxWidth: "100%" }}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
                <Column
                    field="title"
                    header="Title"
                    style={{ width: "20%", margin: "0.25rem" }}
                    body={titleBodyTemplate}
                />
                <Column
                    field="disease"
                    header="Disease"
                    style={{ minWidth: "20%", margin: "0.25rem" }}
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

    const toast = useRef<Toast>(null);

    const acceptDeleteHandler = async (id: number) => {
        try{
            await deleteArticle(id)
            toast.current?.show({
                severity: "success",
                summary: "success",
                detail: "Article has been deleted",
                life: 3000,
            });

            setArticle((await getAllArticles()).data)
        } catch (e){
            toast.current?.show({
                severity: "error",
                summary: "error",
                detail: "Error Occured when deleting the article",
                life: 3000,
            });
        }
    };

    const confirmDialogDelete = (id: number) => {
        confirmDialog({
            message: "Do you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: () => {
                acceptDeleteHandler(id);
            },
        });
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
                        You can manage all Articles, such as editing, deleting
                        and more.
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
                                    <Toast ref={toast} style={{zIndex: 99}}/>
                                    <ConfirmDialog />
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
