import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TourSearch from '../components/TourOpSearch';
import Sidebar from '../components/TourDetailSideBar';
import TourList from '../components/TourOpList';
import HeaderTopbar from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Content = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';
    setSearchQuery(name);
  }, [location.search]);

  return (
    <>
      <div className="breadcrumb-bar breadcrumb-bg-01 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              {/* <h2 className="breadcrumb-title mb-2">Hồ sơ của tôi</h2> */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="isax isax-home5"></i>
                    </a>
                  </li>
                  {/* <li className="breadcrumb-item active" aria-current="page">
                      Hồ sơ của tôi
                  </li> */}
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