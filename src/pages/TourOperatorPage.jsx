import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TourSearch from '../components/TourOpSearch';
import Sidebar from '../components/TourDetailSideBar';
import TourList from '../components/TourOpList';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Content = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      

      <div className="breadcrumb-bar breadcrumb-bg-02 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Nhà Điều Hành</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="home">
                      <FontAwesomeIcon icon={faHome} />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Danh sách nhà điều hành</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <TourSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TourList searchQuery={searchQuery} />
        </div>
      </div>

     
    </>
  );
};

export default Content;
