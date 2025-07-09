import React from "react";


    const Breadcrumb = () => (
        // Breadcrumb
        <div className="breadcrumb-bar breadcrumb-bg-01 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-12">
                        {/* <h2 className="breadcrumb-title mb-2">My Profile</h2> */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center mb-0">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                        <i className="isax isax-home5"></i>
                                    </a>
                                </li>
                                {/* <li className="breadcrumb-item active" aria-current="page">
                                    My Profile
                                </li> */}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        // /Breadcrumb
    );

    export default Breadcrumb;