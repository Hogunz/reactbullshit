import React from "react";

const GoogleMap = () => {
    return (
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2845452291963!2d120.33826437583897!3d16.05071743993182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339167fd0100bfa3%3A0x392d5ed47cf7639e!2sUniversidad%20de%20Dagupan!5e0!3m2!1sen!2sph!4v1699485892090!5m2!1sen!2sph"
                className="w-full max-h-screen h-[270px] px-[30px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default GoogleMap;
