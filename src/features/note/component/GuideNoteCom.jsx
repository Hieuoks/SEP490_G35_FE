import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash, FaBuilding, FaInfoCircle, FaPlus, FaChevronLeft, FaChevronRight, FaStore } from 'react-icons/fa';
import { getNotes, createNote, updateNote, deleteNote,getNoteByTourGuide } from '../../../services/noteService';
const GuideNoteCom = () => {
    const [keyword, setKeyword] = useState('');
    const [notes, setNotes] = useState([]);
    const [Total, setTotal] = useState(0);
    const navigate = useNavigate();
    const role = Cookies.get('roleName');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const { bookingId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [Medias, setMedias] = useState([]);
    const fetchingNotes = async () => {
        try {
            let response;
            if(role === 'Tour Guide') {
                const res = await getNoteByTourGuide();
                if (bookingId) {
                    // Filter notes by bookingId if provided
                    console.log("res",bookingId )
                    response = res.filter(item => item.bookingId == bookingId);
                }else{
                    response = res;
                }
            } else {
                response = await getNotes();
            }
            setTotal(response.length);
            const searched = keyword
                ? response.filter(item =>
                    item.tourGuideName?.toLowerCase().includes(keyword.toLowerCase()))
                : response;
            setNotes(searched);
            console.log("Notes fetched:", response);
        } catch (error) {
            console.error('Error fetching notes:', error);
            toast.error('Unable to load notes');
        }
    };
    useEffect(() => {
        fetchingNotes();
    }, [keyword]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(notes.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleUpdateNote = async (noteId) => {
        try {
            const response = await updateNote(noteId, title, content,Medias);
            toast.success('Note updated successfully');
            console.log('Note updated:', response);
            setTitle('');
            setContent('');
            setMedias([]);
            fetchingNotes();
        } catch (error) {
            console.error('Error updating note:', error);
            toast.error('Unable to update note');
        } 
    }

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await deleteNote(noteId);
            toast.success('Note deleted successfully');
            console.log('Note deleted:', response);
            fetchingNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Unable to delete note');
        }
    }
    const handleAddNote = async () => {
        try {
            const note = {
                BookingId : bookingId,
                title: title,
                content: content,
            };
            console.log("request",note);
            const response = await createNote(note);
            toast.success('Note created successfully');
            console.log('Note created:', response);
            setTitle('');
            setContent('');
            setMedias([]);
            fetchingNotes();
        } catch (error) {
            console.error('Error creating note:', error);
            toast.error('Unable to create note');
        }
    }
    return (
            <div className="col-xl-9 col-lg-8">

                {/* <!-- Review Title --> */}
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                            <div>
                                <h6>Notes By Guides</h6>
                                <p className="fs-14">Total : {Total}</p>
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="me-3 ">
                                    <div className="input-icon-start  me-2 position-relative">
                                        <span className="icon-addon">
                                            <FaSearch className="fs-14" />
                                        </span>
                                        <input type="text" className="form-control" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                  {role === 'Tour Guide' && bookingId ? (
                                    <a className="btn btn-primary d-inline-flex align-items-center me-0" data-bs-toggle="modal" data-bs-target="#Add"><FaPlus className="me-1 fs-16" />Add Note</a>
                                  ):(
                                    <div></div>
                                  )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /Review Title --> */}
                {currentItems.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        No notes found.
                    </div>
                ):(
                  currentItems.map((note) => (
                    <div className="card shadow-none" key={note.noteId}>
                    <div className="card-body">
                        <div className="border-bottom mb-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-2">
                                <div className="d-flex align-items-center">
                                    <span className="avatar avatar-lg rounded-circle flex-shrink-0 me-2">
                                        <img src="assets/img/users/user-01.jpg" alt="user" className="img-fluid rounded-circle" />
                                    </span>
                                    <div>
                                        <h6 className="fs-16">{note.tourGuideName}</h6>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <span className="fs-14 d-flex align-items-center">{new Date(note.createdAt).toLocaleString("en-GB")}<i className="ti ti-point-filled text-gray mx-2"></i></span>
                                            <p className="fs-14">{note.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {role === 'Tour Guide'? (
                                      <div>
                                        <a href="javascript:void(0);" className="btn btn-white btn-sm border me-2" data-bs-toggle="modal" data-bs-target={`#Update${note.noteId}`} onClick={()=>{
                                          setTitle(note.title);
                                          setContent(note.content);
                                        }}><FaEdit/>Edit</a>
                                        <a href="javascript:void(0);" className="btn btn-white btn-sm border" data-bs-toggle="modal" data-bs-target={`#Delete${note.noteId}`}><FaTrash/>Delete</a>
                                      </div>

                                    ):(
                                      <div></div>
                                    )}
                                </div>
                            </div>
                            <p className="fs-16 mb-3">{note.content}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                            <p className="fs-14 d-flex align-items-center mb-0"><FaInfoCircle /> 
                            <b>Info </b>
                            : {note.tourTitle}, <b>Departdate</b> : {new Date(note.departureDate).toLocaleDateString("en-GB")}
                            </p>
                        </div>
                    </div>
                    </div>
                ))
                )}
                {/* <!-- Reviews --> */}
                
                {/* <!-- /Reviews --> */}




                {/* <!-- Pagination --> */}
                <nav class="pagination-nav">
                                    <ul class="pagination justify-content-center">
                                        {/* Previous Button */}
                                        <li class={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a
                                                class="page-link"
                                                href="javascript:void(0);"
                                                aria-label="Previous"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                            >
                                                <span aria-hidden="true"><FaChevronLeft /></span>
                                            </a>
                                        </li>
                
                                        {/* Page Numbers */}
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const pageNum = index + 1;
                                            const isActive = pageNum === currentPage;
                
                                            return (
                                                <li key={pageNum} class={`page-item ${isActive ? 'active' : ''}`}>
                                                    <a
                                                        class="page-link"
                                                        href="javascript:void(0);"
                                                        onClick={() => handlePageChange(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </a>
                                                </li>
                                            );
                                        })}
                
                                        {/* Next Button */}
                                        <li class={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a
                                                class="page-link"
                                                href="javascript:void(0);"
                                                aria-label="Next"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                            >
                                                <span aria-hidden="true"><FaChevronRight /></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                {/* <!-- /Pagination --> */}
            {currentItems.map((note) => (

            <div key={note.noteId}>
            <div className="modal fade" id={`Update${note.noteId}`}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Note</h5>
                            <a href="javascript:void(0);" onClick={()=>{
                              setContent('');
                              setTitle('');
                            }}  data-bs-dismiss="modal" className="btn-close text-dark"></a>
                        </div>
                        <div >
                            <div className="modal-body pb-0">
                                <div className="mb-3">
                                    <label className="form-label">Title <span className="text-danger">*</span></label>
                                    <input className="form-control" defaultValue={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Content <span className="text-danger">*</span></label>
                                    <textarea className="form-control" rows="3" defaultValue={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit"  className="btn btn-md btn-primary" data-bs-dismiss="modal" onClick={()=>handleUpdateNote(note.noteId)}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={`Delete${note.noteId}`}>
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            
                                <div className="text-center">
                                    <h5 className="mb-3">Delete Review</h5>
                                    <p className="mb-3">Are you sure you want to delete this review?</p>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <a href="#" className="btn btn-light me-2" data-bs-dismiss="modal">No</a>
                                        <button className="btn btn-primary" data-bs-dismiss="modal"  onClick={()=>{handleDeleteNote(note.noteId)}}>Yes</button>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
            ))}
            <div className="modal fade" id="Add">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Note</h5>
                            <a href="javascript:void(0);" onClick={()=>{
                              setContent('');
                              setTitle('');
                            }}  data-bs-dismiss="modal" className="btn-close text-dark"></a>
                        </div>
                        <div >
                            <div className="modal-body pb-0">
                                <div className="mb-3">
                                    <label className="form-label">Title <span className="text-danger">*</span></label>
                                    <input className="form-control" defaultValue={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Content <span className="text-danger">*</span></label>
                                    <textarea className="form-control" rows="3" defaultValue={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-md btn-primary" data-bs-dismiss="modal"  onClick={()=>handleAddNote()}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
    );
}
export default GuideNoteCom;