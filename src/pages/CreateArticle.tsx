import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

import DynamicInput from "../components/DynamicInput"
import { Toast } from "primereact/toast"
import { createArticle } from "../api/article"
import useScript from "../hooks/useScript"

function CreateArticle() {    
    useScript("/library/summernote/dist/summernote-bs4.js")
    useScript("/library/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js")
    useScript("/library/selectric/public/jquery.selectric.min.js")
    useScript("/library/upload-preview/upload-preview.js")
    useScript("/js/page/features-post-create.js")
    
    const navigate = useNavigate()
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [symptomSummary, setSymptomSummary] = useState("")
    const [disease, setDisease] = useState("")
    const [cause, setCause] = useState("")
    const [category, setCategory] = useState("Kopi")
    const [plant, setPlant] = useState(["Kopi"])
    const [label, setLabel] = useState("Rust")
    const [symptoms, setSymtoms] = useState([{data: ""}])
    const [preventions, setPreventions] = useState([{data: ""}])
    const [treatments, setTreatments] = useState({chemical: "", organic: ""})

    const [image, setImage] = useState(new Blob())

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

    const submitHandler = async () => {
        if(image.size == 0){return}

        const formdata = new FormData()

        formdata.append("image", image)

        const data = {
            title: title,
            content: content,
            symptom_summary: symptomSummary,
            disease: {
                disease_name: disease,
                cause: cause,
                category: category,
                plants: plant
            },
            label: label,
            symptoms: symptoms.map( (_s)=> {return _s.data}),
            preventions: preventions.map( (_p)=> {return _p.data}),
            treatments: {
                organic: treatments.organic,
                chemical: treatments.chemical
            }
        }

        formdata.append("json",JSON.stringify(data))

        try{
            const res = await createArticle(formdata)
            console.log(res)
            if(res){
                showToast("success", "success", res.message)
            }
        } catch(e){
            //@ts-expect-error i got no time for this
            showToast("error", "error", e.response.data.error)
        }

    }

    const toast = useRef<Toast>(null);
    const showToast = (severity: "success" | "error", summary: string, detail: string = "") => {
        toast.current?.show({ severity: severity, summary: summary, detail: detail, life: 3000 });
    };

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
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Judul</label>
                                        <div className="col-sm-12 col-md-7">
                                            <input onChange={(e) => {setTitle(e.target.value)}} type="text" name="title" className="form-control" required={true}/>
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
                                                    id="image-upload" 
                                                    onChange={(e) => {if (!e.target.files) return; setImage(e.target.files[0])}}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="text-center">Penyakit</h5>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Nama</label>
                                        <div className="col-sm-12 col-md-7">
                                            <input onChange={(e) => {setDisease(e.target.value)}} type="text" name="name" className="form-control" required={true}/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Deskripsi Penyakit</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {setContent(e.target.value)}} className="summernote-simple" name="content" style={{width: "100%"}} required={true}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Gejala</label>
                                        <div className="col-sm-12 col-md-7">
                                            {DynamicInput(symptoms, setSymtoms)}
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Kesimpulan Gejala</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {setSymptomSummary(e.target.value)}} className="summernote-simple" name="content" style={{width: "100%"}}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Penyebab</label>
                                        <div className="col-sm-12 col-md-7">
                                            <input onChange={(e) => {setCause(e.target.value)}} type="text" name="title" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Kategori</label>
                                        <div className="col-sm-12 col-md-7">
                                            <select onChange={(e) => {setCategory(e.target.value)}} name="category" className="form-control selectric">
                                                <option>Kopi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tumbuhan</label>
                                        <div className="col-sm-12 col-md-7">
                                            <select onChange={(e) => {setPlant([e.target.value])}} name="category" className="form-control selectric">
                                                <option>Kopi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Label</label>
                                        <div className="col-sm-12 col-md-7">
                                            <select onChange={(e) => {setLabel(e.target.value)}} name="category" className="form-control selectric">
                                                <option>Rust</option>
                                                <option>Miner</option>
                                                <option>Phoma</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Preventions</label>
                                        <div className="col-sm-12 col-md-7">
                                            {DynamicInput(preventions, setPreventions)}
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="text-center">Pengobatan</h5>
                                    <div className="form-group row mt-5 mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Kimia</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {treatmentInputHandler(e.target.value, "chemical")}} className="summernote-simple" name="content" style={{width: "100%"}}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Organik</label>
                                        <div className="col-sm-12 col-md-7">
                                            <textarea onChange={(e)=> {treatmentInputHandler(e.target.value, "organic")}} className="summernote-simple" name="content" style={{width: "100%"}}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                        <div className="col-sm-12 col-md-7">
                                            <button onClick={submitHandler} className="btn btn-primary">Buat Artikel</button>
                                        </div>
                                    </div>
                                    <Toast ref={toast}/>
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