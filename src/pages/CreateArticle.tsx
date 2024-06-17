import "../../public/library/summernote/dist/summernote-bs4.css"
import "../../public/library/selectric/public/selectric.css"
import "../../public/library/bootstrap-tagsinput/dist/bootstrap-tagsinput.css"

import { Link, useNavigate } from "react-router-dom"

import DynamicInput from "../components/DynamicInput"
import useScript from "../hooks/useScript"
import { useState } from "react"

function CreateArticle() {    
    const importScript = [
        "/library/summernote/dist/summernote-bs4.js",
        "/library/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js",
        "/library/selectric/public/jquery.selectric.min.js",
        "/library/upload-preview/upload-preview.js",
        "/js/page/features-post-create.js",
    ]

    useScript(importScript)
    
    const navigate = useNavigate()
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [symptoms, setSymtoms] = useState([{data: ""}])
    const [preventions, setPreventions] = useState([{data: ""}])
    const [category, setCategory] = useState("")
    const [treatments, setTreatments] = useState({chemical: "", organic: ""})

    console.log({
        title,
        content,
        symptoms,
        preventions,
        category,
        treatments
    })

    const treatmentInputHandler = (value: string, type: "chemical" | "organic") => {
        if (type == "chemical"){
            const _treatments = {...treatments}
            _treatments.chemical = value
            setTreatments(_treatments)
        }
        if (type == "organic"){
            const _treatments = {...treatments}
            _treatments.organic = value
            setTreatments(_treatments)
        }
    }

    return ( 
        <div className="main-content">
            <section className="section">
                <div className="section-header">
                    <div className="section-header-back">
                        <a href="#" onClick={(e) => {e.preventDefault(); navigate(-1) }}
                            className="btn btn-icon" style={{lineHeight: "1.5"}}><i className="fas fa-arrow-left"></i>
                        </a>
                    </div>
                    <h1>Create New Article</h1>
                    <div className="section-header-breadcrumb">
                        <div className="breadcrumb-item"><Link to="/article">Articles</Link></div>
                        <div className="breadcrumb-item">Create New Article</div>
                    </div>
                </div>

                <div className="section-body">
                    <h2 className="section-title">Create New Article</h2>
                    <p className="section-lead">
                        On this page you can create a new Article and fill in all fields.
                    </p>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Write Your Article</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Title</label>
                                        <div className="col-sm-12 col-md-7">
                                            <input onChange={(e) => {setTitle(e.target.value)}} type="text" name="title" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Category</label>
                                        <div className="col-sm-12 col-md-7">
                                            <select onChange={(e) => {setCategory(e.target.value)}} name="category" className="form-control selectric">
                                                <option>Tech</option>
                                                <option>News</option>
                                                <option>Political</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Thumbnail</label>
                                        <div className="col-sm-12 col-md-7">
                                            <div id="image-preview"
                                                className="image-preview">
                                                <label htmlFor="image-upload"
                                                    id="image-label">Choose File</label>
                                                <input type="file"
                                                    name="image"
                                                    id="image-upload" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Content</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {setContent(e.target.value)}} className="summernote-simple" name="content" style={{width: "100%"}}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Symptom</label>
                                        <div className="col-sm-12 col-md-7">
                                            {DynamicInput(symptoms, setSymtoms)}
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Preventions</label>
                                        <div className="col-sm-12 col-md-7">
                                            {DynamicInput(preventions, setPreventions)}
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="text-center">Treatments</h5>
                                    <div className="form-group row mt-5 mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Chemical</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {treatmentInputHandler(e.target.value, "chemical")}} className="summernote-simple" name="content" style={{width: "100%"}}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Organic</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {treatmentInputHandler(e.target.value, "organic")}} className="summernote-simple" name="content" style={{width: "100%"}}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                        <div className="col-sm-12 col-md-7">
                                            <button className="btn btn-primary">Create Article</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateArticle