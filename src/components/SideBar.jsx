import React, { useState } from 'react';
const Sidebar = () => {
    const [popularOpen, setPopularOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);
    const [tourTypesOpen, setTourTypesOpen] = useState(true);
    const [accommodationOpen, setAccommodationOpen] = useState(true);
    const [activitiesOpen, setActivitiesOpen] = useState(true);
    const [mealsOpen, setMealsOpen] = useState(true);
    const [guestsOpen, setGuestsOpen] = useState(true);
    const [reviewsOpen, setReviewsOpen] = useState(true);

    const filterSections = [
        {
            title: 'Popular',
            isOpen: popularOpen,
            setOpen: setPopularOpen,
            icon: 'fas fa-trophy',
            items: ['Local Guide', 'VIP Access', 'Photographs', 'Adventure Gears'],
        },
        {
            title: 'Price Per Night',
            isOpen: priceOpen,
            setOpen: setPriceOpen,
            icon: 'fas fa-dollar-sign',
            content: (
                <div>
                    <input type="text" id="range_03" readOnly />
                    <div className="filter-range-amount">
                        <p className="fs-6">Range: <span className="text-muted fw-medium">$200 - $800</span></p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Tour Types',
            isOpen: tourTypesOpen,
            setOpen: setTourTypesOpen,
            icon: 'fas fa-map',
            items: ['Ecotourism', 'Adventure Tour', 'Group Tours', 'Beach Tours', 'Honey Moon', 'Historical Tours', 'Summer Trip', 'City Trip'],
            more: true,
        },
        {
            title: 'Accommodation Type',
            isOpen: accommodationOpen,
            setOpen: setAccommodationOpen,
            icon: 'fas fa-hotel',
            items: ['Hotel', 'Campsite', 'Resort', 'Cabin'],
        },
        {
            title: 'Activities',
            isOpen: activitiesOpen,
            setOpen: setActivitiesOpen,
            icon: 'fas fa-hiking',
            items: ['Hiking', 'Sightseeing', 'Wildlife Safari', 'Boat Tours'],
        },
        {
            title: 'Meal plans available',
            isOpen: mealsOpen,
            setOpen: setMealsOpen,
            icon: 'fas fa-utensils',
            items: ['All inclusive', 'Breakfast', 'Lunch', 'Dinner'],
        },
        {
            title: 'Guests',
            isOpen: guestsOpen,
            setOpen: setGuestsOpen,
            icon: 'fas fa-users',
            items: ['1 - 5', '5 - 10', '10 - 15', '15 - 20', '20+'],
        },
        {
            title: 'Reviews',
            isOpen: reviewsOpen,
            setOpen: setReviewsOpen,
            icon: 'fas fa-star',
            items: [
                { label: '5 Star', stars: 5 },
                { label: '4 Star', stars: 4 },
                { label: '3 Star', stars: 3 },
                { label: '2 Star', stars: 2 },
                { label: '1 Star', stars: 1 },
            ],
        },
    ];

    return (
        <div className="col-xl-3 col-lg-3">
            <div className="card filter-sidebar mb-4 mb-lg-0">
                <div className="card-header d-flex align-items-center justify-content-between p-3">
                    <h5>Filters</h5>
                    <a href="#" className="fs-6 text-primary">Reset</a>
                </div>
                <div className="card-body p-0">
                    <form action="search.html">
                        <div className="p-3 border-bottom">
                            <label className="form-label fs-6">Search by Tour Type</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input type="text" className="form-control" placeholder="Search by Tour Type" />
                            </div>
                        </div>
                        <div className="accordion accordion-list">
                            {filterSections.map((section, index) => (
                                <div key={index} className="accordion-item border-bottom p-3">
                                    <div className="accordion-header">
                                        <div
                                            className="accordion-button p-0"
                                            onClick={() => section.setOpen(!section.isOpen)}
                                        >
                                            <i className={`${section.icon} me-2 text-primary`}></i>{section.title}
                                        </div>
                                    </div>
                                    <div className={`accordion-collapse collapse ${section.isOpen ? 'show' : ''}`}>
                                        <div className="accordion-body pt-2">
                                            {section.content || (
                                                <div>
                                                    {section.items.map((item, idx) => (
                                                        <div key={idx} className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input
                                                                className="form-check-input ms-0 mt-0"
                                                                type="checkbox"
                                                                id={`${section.title.toLowerCase().replace(' ', '-')}${idx + 1}`}
                                                                defaultChecked={section.title === 'Tour Types' && idx < 4 || section.title === 'Accommodation Type' && item === 'Cabin' || section.title === 'Activities' && item === 'Boat Tours' || section.title === 'Meal plans available' && item === 'Dinner' || section.title === 'Guests' && item === '15 - 20'}
                                                            />
                                                            <label
                                                                className="form-check-label ms-2"
                                                                htmlFor={`${section.title.toLowerCase().replace(' ', '-')}${idx + 1}`}
                                                            >
                                                                {section.title === 'Reviews' ? (
                                                                    <span className="rating d-flex align-items-center">
                                                                        {[...Array(item.stars)].map((_, i) => (
                                                                            <i key={i} className="fas fa-star text-primary me-1"></i>
                                                                        ))}
                                                                        <span className="ms-2">{item.label}</span>
                                                                    </span>
                                                                ) : (
                                                                    item
                                                                )}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    {section.more && (
                                                        <a href="#" className="text-primary fw-medium fs-6">
                                                            See Less
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;